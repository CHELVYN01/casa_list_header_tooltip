/** @odoo-module **/
// License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl).

import { TaxTotalsComponent } from "@account/components/tax_totals/tax_totals";
import { patch } from "@web/core/utils/patch";
import { ExtraTotalsField } from "@sale/js/extra_total_field/extra_total_field";

/**
 * The totals of orders and invoices are drawn by widgets (tax_totals,
 * extra_total_fields): their lines have no field tooltip, even in Odoo 18.
 * Each label gets one naming the fields behind the amount.
 */
function fieldEntries(record, names) {
    return names
        .filter((name) => record?.fields[name])
        .map((name) => {
            const field = record.fields[name];
            return { name, label: field.string, type: field.type, help: field.help || "" };
        });
}

function tooltipInfo(record, title, names, { note = "", expression = "" } = {}) {
    return JSON.stringify({
        title,
        debug: Boolean(odoo.debug),
        resModel: record?.resModel || "",
        fields: fieldEntries(record, names),
        note,
        expression,
    });
}

patch(TaxTotalsComponent.prototype, {
    casaSubtotalTooltip(subtotal, index) {
        const record = this.props.record;
        if (index === 0) {
            return tooltipInfo(record, subtotal.name, ["amount_untaxed"], {
                expression: "format_amount(object.amount_untaxed)",
            });
        }
        return tooltipInfo(record, subtotal.name, [], {
            note: "Subtotal of the tax summary (tax_totals)",
            expression: `format_amount(object.tax_totals['subtotals'][${index}]['base_amount_currency'])`,
        });
    },

    casaTotalTooltip() {
        return tooltipInfo(this.props.record, "Total", ["amount_total"], {
            expression: "format_amount(object.amount_total)",
        });
    },
});

patch(TaxTotalsComponent.components.TaxGroupComponent.prototype, {
    casaTaxGroupTooltip() {
        const { totals, subtotal, taxGroup } = this.props;
        const subtotalIndex = totals.subtotals.indexOf(subtotal);
        const groupIndex = subtotal.tax_groups.indexOf(taxGroup);
        // the form record: tax groups do not get it as a prop
        return tooltipInfo(this.env.model?.root, taxGroup.group_name, ["amount_tax"], {
            note: "One tax group; Taxes (amount_tax) is the sum of all of them",
            expression:
                `format_amount(object.tax_totals['subtotals'][${subtotalIndex}]` +
                `['tax_groups'][${groupIndex}]['tax_amount_currency'])`,
        });
    },
});

// sale_margin's line, "Margin (12%)": the margin fields are not loaded by the form
const MARGIN_LABEL = /\(\s*-?[\d.,]+\s*%\)\s*$/;
const MARGIN_FIELDS = [
    { name: "margin", label: "Margin", type: "monetary", help: "" },
    { name: "margin_percent", label: "Margin (%)", type: "float", help: "" },
];

patch(ExtraTotalsField.prototype, {
    casaExtraLineTooltip(line) {
        const record = this.props.record;
        if (MARGIN_LABEL.test(line.label)) {
            const info = JSON.parse(
                tooltipInfo(record, line.label, [], { expression: "format_amount(object.margin)" })
            );
            info.fields = MARGIN_FIELDS;
            return JSON.stringify(info);
        }
        return tooltipInfo(record, line.label, [], { note: "Computed for the totals (extra_total_fields)" });
    },
});

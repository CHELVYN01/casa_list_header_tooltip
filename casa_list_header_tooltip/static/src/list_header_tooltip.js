/** @odoo-module **/
// License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl).

import { onMounted, onPatched } from "@odoo/owl";
import { patch } from "@web/core/utils/patch";
import { ListRenderer } from "@web/views/list/list_renderer";

const GROUP_TEMPLATE = "casa_list_header_tooltip.ColumnGroupTooltip";

/**
 * Odoo 18 showed a tooltip on every list header (label and help, or the
 * technical field info in debug). Odoo 20 only does it for fields with a help
 * and never for column groups (order lines: Description, Quantity).
 *
 * The attributes are set on the rendered headers rather than through the
 * template: renderers with their own template (order lines, ...) would not
 * get a template extension.
 */
patch(ListRenderer.prototype, {
    setup() {
        super.setup(...arguments);
        const annotate = () => this.casaAnnotateHeaders();
        onMounted(annotate);
        onPatched(annotate);
    },

    casaAnnotateHeaders() {
        const headerRow = this.tableRef()?.querySelector(":scope > thead > tr");
        if (!headerRow) {
            return;
        }
        // one <th> per column, after the selection checkbox
        const headers = [...headerRow.children].filter((th) => !th.classList.contains("o_list_record_selector"));
        this.columns.forEach((column, index) => {
            const label = headers[index]?.querySelector(":scope > div.d-flex");
            if (!label || !column.hasLabel) {
                return;
            }
            if (column.type === "column_group") {
                this.casaSetTooltip(label, GROUP_TEMPLATE, JSON.stringify(this.casaColumnGroupTooltip(column)));
            } else if (column.type === "field" && !label.dataset.tooltipTemplate) {
                // no help and no debug: Odoo 20 shows nothing unless the label is cut
                this.casaSetTooltip(label, "web.ListHeaderHelpTooltip", this.makeTooltip(column));
            }
        });
    },

    /** ``info`` is the JSON string the tooltip service parses. */
    casaSetTooltip(element, template, info) {
        element.dataset.tooltipTemplate = template;
        element.dataset.tooltipInfo = info;
        element.dataset.tooltipDelay = "1000";
    },

    casaColumnGroupTooltip(column) {
        // makeTooltip returns the JSON string of getTooltipInfo
        const fields = column.fields
            .filter((fieldInfo) => this.fields[fieldInfo.name])
            .map((fieldInfo) => JSON.parse(this.makeTooltip(fieldInfo)).field);
        return {
            label: column.label,
            debug: Boolean(odoo.debug),
            resModel: this.props.list.resModel,
            fields,
        };
    },
});

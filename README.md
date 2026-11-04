# Field Tooltips for Lists, Orders and Invoices

Free Odoo 20 module that shows which fields sit behind list columns and totals when you hover over them.

## Features

**List column headers**

- List column headers with a label show a tooltip, as they did in Odoo 18.
- Column groups are covered too, for example Description, Quantity and Amount on Sales Order lines. The tooltip lists each field in the group.

**Order and invoice totals**

- Hovering a label in the totals block of a Sales Order or Invoice shows the field behind it.
- This covers Untaxed Amount, tax lines, Total and Margin. The Margin line appears when `sale_margin` is installed.

**Debug mode**

Technical details are for developers, so they only appear in debug mode. Outside debug mode, tooltips stay simple and show the field label and help text.

- Tooltips also show the technical field name, field type and model.
- Totals show the expression to use in report templates, for example `format_amount(object.amount_total)`.

## Requirements

- Odoo 20.0
- Sales (`sale`), which is installed automatically as a dependency

## Installation

1. Clone the `20.0` branch:

   ```bash
   git clone -b 20.0 https://github.com/CHELVYN01/casa_list_header_tooltip.git
   ```

2. Add the cloned folder to `addons_path` in your Odoo configuration.
3. Restart Odoo.
4. Go to Apps, select **Update Apps List**, then install `casa_field_tooltip`.

## Tutorial

There is nothing to configure after installation.

### See the fields behind a list column

1. Open any list view, for example **Sales > Orders > Orders**.
2. Hover over a column header, such as **Total**.
3. Wait a moment. The tooltip shows the field label and its help text, if it has one.

### See the fields in a column group

1. Open a Sales Order and go to the **Order Lines** tab.
2. Hover over a grouped header, such as **Description**, **Quantity** or **Amount**.
3. The tooltip lists every field stacked in that column.

### See the fields behind the totals

1. Open a Sales Order or a customer invoice.
2. In the totals block, hover over a label: **Untaxed Amount**, a tax line or **Total**.
3. The tooltip shows the field behind the amount.

To see the Margin line on Sales Orders, install `sale_margin` from Apps, then hover over the Margin label.

### Get technical names for development

1. Go to **Settings** and select **Activate the developer mode**, or add `?debug=1` to the URL.
2. Hover over a column header or a totals label again.
3. The tooltip now shows the technical field name, field type and model.
4. On totals, copy the expression after **Report:** into your report template.

Example for the Total label:

```text
Object: sale.order
Report: format_amount(object.amount_total)
```

## License

[LGPL-3.0](LICENSE). The GPL-3.0 text it builds on is included in [COPYING](COPYING).

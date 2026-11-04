# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl).
{
    "name": "Sales & Invoice Totals Tooltips",
    "summary": "Hovering the totals of orders and invoices (Untaxed Amount, taxes, Total, Margin) shows the fields behind them",
    "version": "20.0.1.0.0",
    "category": "Hidden/Tools",
    "author": "Casa",
    "license": "LGPL-3",
    "depends": ["sale"],
    "assets": {
        "web.assets_backend": [
            "casa_sale_totals_tooltip/static/src/totals_tooltip.js",
            "casa_sale_totals_tooltip/static/src/totals_tooltip.xml",
        ],
    },
    "installable": True,
}

# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl).
{
    "name": "Field Tooltips for Lists, Orders and Invoices",
    "summary": "Hovering list column headers and the totals of orders and invoices shows the fields behind them",
    "version": "20.0.1.0.0",
    "category": "Extra Tools",
    "author": "Casa",
    "license": "LGPL-3",
    "depends": ["sale"],
    "images": [
        "static/description/banner_screenshot.png",
        "static/description/list_header_screenshot.png",
        "static/description/totals_screenshot.png",
    ],
    "assets": {
        "web.assets_backend": [
            "casa_field_tooltip/static/src/list_header_tooltip.js",
            "casa_field_tooltip/static/src/list_header_tooltip.xml",
            "casa_field_tooltip/static/src/totals_tooltip.js",
            "casa_field_tooltip/static/src/totals_tooltip.xml",
        ],
    },
    "installable": True,
}

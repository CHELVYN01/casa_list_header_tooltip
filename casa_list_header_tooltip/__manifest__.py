# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl).
{
    "name": "List Column Header Tooltips",
    "summary": "Hovering a list column header shows its field(s), as in Odoo 18, column groups included",
    "version": "20.0.1.0.0",
    "category": "Hidden/Tools",
    "author": "Casa",
    "license": "LGPL-3",
    "depends": ["web"],
    "assets": {
        "web.assets_backend": [
            "casa_list_header_tooltip/static/src/list_header_tooltip.js",
            "casa_list_header_tooltip/static/src/list_header_tooltip.xml",
        ],
    },
    "installable": True,
}

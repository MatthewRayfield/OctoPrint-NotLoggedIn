# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class NotLoggedInPlugin(octoprint.plugin.StartupPlugin, octoprint.plugin.TemplatePlugin, octoprint.plugin.AssetPlugin):
    def get_assets(self):
     return dict(
         js=["js/notloggedin.js"]
     )

__plugin_implementation__ = NotLoggedInPlugin()

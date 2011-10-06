#####################################################################
#
# Copyright 2007 Zenoss, Inc.  All Rights Reserved.
#
######################################################################
__doc__="""
This ZenPack installs several GUI components which allow easy navigation
and lookup into the Plixer Scutinizer product.
"""

__import__('pkg_resources').declare_namespace(__name__)
import Globals
import os
import os.path
import types
from Acquisition import aq_chain
from Products.ZenModel.ZenPack import ZenPackBase
from Products.ZenModel.Exceptions import IpAddressConflict
from Products.ZenUtils.Exceptions import ZentinelException
from Products.CMFCore.DirectoryView import registerDirectory


from Products.ZenModel.DeviceClass import DeviceClass
skinsDir = os.path.join(os.path.dirname(__file__), 'skins')
if os.path.isdir(skinsDir):
    registerDirectory(skinsDir, globals())


#====================================================
# Subclass ZenPackBase so that we can control migration
#====================================================
class ZenPack(ZenPackBase):
    packZProperties = [
           ('zScrutinizerUrl', "http://xxx.xxx.xxx.xxx/search.html?user=SCRUT_SERVICE_USER&pass=SCRUT_SERVICE_PASS&el=", 'string'),
    ]

    def install(self, app):
        ZenPackBase.install(self, app)

    def upgrade(self, app):
        ZenPackBase.upgrade(self, app)

    def remove(self, app, leaveObjects):
        ZenPackBase.remove(self, app, leaveObjects)

def _buildURL(device, ip):
    url = "#"
    try:
        baseurl = device.zScrutinizerUrl
        url = "%s%s" % (baseurl, ip)
    finally:
        return url


#make the new property available for UI consumption
from Products.Zuul.infos.device import DeviceInfo
@property
def scrutinizerUrlDevice(self):
    return _buildURL(self._object, self._object.manageIp)
setattr(DeviceInfo, 'scrutinizerUrl', scrutinizerUrlDevice)

#make the new property available for UI consumption
from Products.Zuul.infos.component.ipinterface import IpInterfaceInfo
@property
def scrutinizerUrlIpInterface(self):
    return _buildURL(self._object.device(), self.ipAddress)
setattr(IpInterfaceInfo, 'scrutinizerUrl', scrutinizerUrlIpInterface)

/*
 ###########################################################################
 # Copyright (C) 2010, Zenoss Inc.
 ###########################################################################
 */
(function() {
    var ZC = Ext.ns('Zenoss.component'),
        DEVICE_DETAIL_BAR_ID = 'devdetailbar';

    var modifyDeviceDetailBar2 = function(detailbar) {
        detailbar.addDeviceDetailBarItem(
            {
                ref: 'scrutinizerUrl',
                label: _t('Scrutinizer')
            },
            function(tbar, data) {
                text = Zenoss.render.link(null, data.scrutinizerUrl, "<img src='/++resource++scrutinizer/scrutinizernetflow.gif'>");
                alert(data.scrutinizerUrl)
                tbar.scrutinizer.setText(text);
            })
    };


    ZC.ExtendedIpInterfacePanel = Ext.extend(ZC.IpInterfacePanel, {
        constructor: function(config) {
            config.fields = [
                {name: 'uid'},
                {name: 'severity'},
                {name: 'status'},
                {name: 'name'},
                {name: 'description'},
                {name: 'ipAddressObjs'},
                {name: 'network'},//, mapping:'network.uid'},
                {name: 'macaddress'},
                {name: 'usesMonitorAttribute'},
                {name: 'ifStatus'},
                {name: 'monitor'},
                {name: 'monitored'},
                {name: 'locking'},
                {name: 'duplex'},
                {name: 'netmask'},
                {name: 'scrutinizerUrl'}
            ];
            ZC.ExtendedIpInterfacePanel.superclass.constructor.call(this, config);


            Ext.each(config.columns, function(col){
                if (col.id == 'ipAddresses') {
                    col.renderer =  function(ipaddresses, metadata, record) {
                        var returnString = '';
                        Ext.each(ipaddresses, function(ipaddress, index) {
                            if (index > 0) returnString += ', ';
                            if (ipaddress && Ext.isObject(ipaddress) && ipaddress.netmask) {
                                ipaddress.name += '/' + ipaddress.netmask;
                                returnString += Zenoss.render.link(ipaddress);
                                returnString += "&#32;&#32;<a href='" + record.data.scrutinizerUrl+ "' target='_blank'>&#62;&#62;</a>";
                            }
                            else if (Ext.isString(ipaddress)) {
                                returnString += ipaddress;
                            }
                        });
                        //<a class="z-entity" href="/zport/dmd/Networks/192.168.56.0/ipaddresses/192.168.56.101">192.168.56.101/24</a>
                        return returnString;
                    };
                }
            });

        }
    });

    Ext.reg('IpInterfacePanel', ZC.ExtendedIpInterfacePanel);


}());
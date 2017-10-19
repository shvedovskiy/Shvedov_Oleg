const device = {};
const userAgent = window.navigator.userAgent.toLowerCase();
const find = needle => userAgent.indexOf(needle) !== -1;

device.ios              = () => device.iphone() || device.ipod() || device.ipad();
device.iphone           = () => !device.windows() && find('iphone');
device.ipod             = () => find('ipod');
device.ipad             = () => find('ipad');
device.android          = () => !device.windows() && find('android');
device.androidPhone     = () => device.android() && find('mobile');
device.androidTablet    = () => device.android() && !find('mobile');
device.blackberry       = () => find('blackberry') || find('bb10') || find('rim');
device.blackberryPhone  = () => device.blackberry() && !find('tablet');
device.blackberryTablet = () => device.blackberry() && find('tablet');
device.windows          = () => find('windows');
device.windowsPhone     = () => device.windows() && find('phone');
device.windowsTablet    = () => device.windows() && (find('touch') && !device.windowsPhone());
device.fxos             = () => (find('(mobile;') || find('(tablet;')) && find('; rv:');
device.fxosPhone        = () => device.fxos() && find('mobile');
device.fxosTablet       = () => device.fxos() && find('tablet');
device.meego            = () => find('meego');
device.cordova          = () => window.cordova && location.protocol === 'file:';
device.nodeWebkit       = () => typeof window.process === 'object';

device.mobile = () =>
    device.androidPhone() ||
    device.iphone() ||
    device.ipod() ||
    device.windowsPhone() ||
    device.blackberryPhone() ||
    device.fxosPhone() ||
    device.meego();

device.tablet = () =>
    device.ipad() ||
    device.androidTablet() ||
    device.blackberryTablet() ||
    device.windowsTablet() ||
    device.fxosTablet();

device.desktop = () => !device.tablet() && !device.mobile();

export default device;

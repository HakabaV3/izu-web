import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

module.exports = {
	spacing: Spacing,
	fontFamily: 'Roboto, sans-serif',
	zIndex: zIndex,
	palette: {
		primary1Color: Colors.orange500,
		primary2Color: Colors.orange700,
		primary3Color: Colors.lightBlack,
		accent1Color: Colors.pinkA200,
		accent2Color: Colors.grey100,
		accent3Color: Colors.grey500,
		textColor: Colors.darkBlack,
		alternateTextColor: Colors.white,
		canvasColor: Colors.white,
		borderColor: Colors.grey300,
		disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
	},
};

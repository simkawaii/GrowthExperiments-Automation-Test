const Page = require( 'wdio-mediawiki/Page' );

class PreferencesPage extends Page {
	get usernamelink() { return $( '#pt-userpage' ); }
	get homepage() { return $( '#ooui-php-41' ); }
	get defaulthomepage() { return $( '#ooui-php-42' ); }
	get changeemailbutton() { return $( '//label[@id=\'ooui-php-33\']/span' ); }
	get save() { return $( '#prefcontrol' ); }

	open() {
		super.openTitle( 'Special:Preferences' );
	}

}

module.exports = new PreferencesPage();

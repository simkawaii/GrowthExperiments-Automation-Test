const assert = require( 'assert' ),
	UserLoginPage = require( 'wdio-mediawiki/LoginPage' ),
	Api = require( 'wdio-mediawiki/Api' ),
	Util = require( 'wdio-mediawiki/Util' ),
	HomepagePage = require( '../pageobjects/homepage.page' ),
	PreferencesPage = require( '../pageobjects/preferences.page' ),
	CreateAccountPage = require( '../pageobjects/createaccount.page' );

describe( 'Homepage: General', function () {
	let username, password;

	before( function () {
		// Create a test account
		username = Util.getTestString( 'NewUser-' );
		password = Util.getTestString();
		browser.call( function () {
			return Api.createAccount( username, password );
		} );
	} );

	it( '[General-001] Verify Homepage page after user creates an account', function () {
		const username2 = Util.getTestString( 'NewUser-' );
		const password2 = Util.getTestString();
		CreateAccountPage.createAccount( username2, password2 );
		CreateAccountPage.usernamelink.click();

		assert( HomepagePage.homepage.isExisting() );
	} );

	it( '[General-002] Verify Homepage page can be disabled', function () {
	    UserLoginPage.login( username, password );

	    PreferencesPage.open();
		browser.execute( ( homepage ) => homepage.scrollIntoView(), PreferencesPage.homepage.value );
	    if ( PreferencesPage.homepage.isSelected() ) {
	        PreferencesPage.homepage.click();
        }
	    PreferencesPage.save.click();

        HomepagePage.open();
	    assert.strictEqual( HomepagePage.homepage.isExisting(), false);
	} );

    it( '[General-003] Verify Homepage page can be enabled', function () {
        UserLoginPage.login( username, password );

        PreferencesPage.open();
		browser.execute( ( homepage ) => homepage.scrollIntoView(), PreferencesPage.homepage.value );
		if ( !PreferencesPage.homepage.isSelected() ) {
			PreferencesPage.homepage.click();
		}
		PreferencesPage.save.click();

        PreferencesPage.usernamelink.click();
        assert( HomepagePage.homepage.isExisting() );
    } );

    it( '[General-004] Verify Homepage page first heading', function () {
        UserLoginPage.login( username, password );

        HomepagePage.open();
        assert( HomepagePage.firstheading.getText(), `Hello, ${username}!` );
    } );
} );

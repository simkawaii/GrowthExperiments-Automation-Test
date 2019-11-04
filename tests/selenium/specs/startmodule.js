const assert = require( 'assert' ),
	UserLoginPage = require( 'wdio-mediawiki/LoginPage' ),
	Api = require( 'wdio-mediawiki/Api' ),
	Util = require( 'wdio-mediawiki/Util' ),
	HomepagePage = require( '../pageobjects/homepage.page' ),
	ChangeEmailPage = require( '../pageobjects/changeemail.page' ),
	PreferencesPage = require( '../pageobjects/preferences.page' ),
	EditPage = require( '../pageobjects/edit.page' ),
	CreateAccountPage = require( '../pageobjects/createaccount.page' );

describe( 'Homepage: Start Module', function () {
	let username1, password1, username2, password2;
	const email = 'email' + Math.random().toString() + '@gmail.com';

	before( function () {
		// Create a test account without email address
		username1 = Util.getTestString( 'NewUser-NoEmail-' );
		password1 = Util.getTestString();
		browser.call( function () {
			return Api.createAccount( username1, password1 );
		} );

		// Create a test account with email address
		username2 = Util.getTestString( 'NewUser-WithEmail-' );
		password2 = Util.getTestString();
		CreateAccountPage.createAccountWithEmail( username2, password2, email );
	} );

	it( '[Start-001][Overall] Verify module title when not all the sub-sections have been completed.', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		// Check Start module title
		assert.strictEqual( HomepagePage.starttitle.getText(), 'Start here' );
	} );

	it( '[Start-002][Account creation] Verify the title ', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		// Verify the title of Account creation section
		assert.strictEqual( HomepagePage.startaccounttitle.getText(), 'Account created' );
	} );

	it( '[Start-003][Account creation] Verify username', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		// Verify the username of 'Account creation' section
		assert.strictEqual( HomepagePage.startaccountusername.getText(), username1 );
	} );

	it( '[Start-004][Account creation] Verify number of edits', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		// Verify number of edits of 'Account creation' section
		assert.strictEqual( HomepagePage.startaccountedits.getText(), '0 edits' );
	} );

	it( '[Start-005][Account creation] Verify text message', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		// Verify text message of 'Account creation' section
		assert( HomepagePage.startaccounttext.getText()
			.includes( 'You\'ve had an account for' ) );
	} );

	it( '[Start-006][Account creation] Verify number of edits when have some edits', function () {
		const content = Util.getTestString( 'Edit-content-' );
		const name = Util.getTestString( 'Edit-name-' );

		// Login the account
		UserLoginPage.login( username1, password1 );

		// Make an edit
		EditPage.edit( name, content );

		// Open Homepage
		HomepagePage.open();

		// Verify number of edits of 'Account creation' section
		assert.strictEqual( HomepagePage.startaccountedits.getText(), '1 edit' );
	} );

	it( '[Start-007][Email] Verify the title when the user has no email address...', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailtitle.getText(), 'Add your email' );
	} );

	it( '[Start-008][Email] Verify the text when the user has no email address...', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailtext.getText(), 'Recommended for account recovery' );
	} );

	it( '[Start-009][Email] Verify the button when the user has no email address...', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailbutton.getText(), 'Add email' );
	} );

	it( '[Start-010][Email] Verify adding email address', function () {
		const EmailAddress = 'start010@gmail.com';

		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		// Click on 'Add email' button
		HomepagePage.startemailbutton.click();

		// Enter an email address into text box
		ChangeEmailPage.email.setValue( EmailAddress );
		ChangeEmailPage.changebutton.click();

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailaddress.getText(), EmailAddress );
	} );

	it( '[Start-011][Email] Verify the title when the user has an unconfirmed email address…', function () {
		// Login the account
		UserLoginPage.login( username2, password2 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailtitle.getText(), 'Confirm your email' );
	} );

	it( '[Start-012][Email] Verify the text when the user has an unconfirmed email address…', function () {
		// Login the account
		UserLoginPage.login( username2, password2 );

		// Open Homepage
		HomepagePage.open();

		assert( HomepagePage.startemailtext.getText()
			.includes( 'Check your email for a confirmation link, or send a new link.' ) );
	} );

	it( '[Start-013][Email] Verify the email address when the user has an unconfirmed email address…', function () {
		// Login the account
		UserLoginPage.login( username2, password2 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailaddress.getText(), email );
	} );

	it( '[Start-014][Email] Verify the button label when the user has an unconfirmed email address…', function () {
		// Login the account
		UserLoginPage.login( username2, password2 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailbutton.getText(), 'Get a new link' );
	} );

	it( '[Start-015][Email] Verify the \'change\' link ', function () {
		const EmailAddress = 'start015@gmail.com';

		// Login the account
		UserLoginPage.login( username2, password2 );

		// Open Homepage
		HomepagePage.open();

		// Click on Change link
		HomepagePage.startemailchangelink.click();

		// Click on "Change or remove email address" button
		PreferencesPage.changeemailbutton.click();

		// Change email address
		ChangeEmailPage.email.setValue(EmailAddress);
		ChangeEmailPage.changebutton.click();

		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailaddress.getText(), EmailAddress );
	} );

	it('[Start-016][Email] Verify \'Get a new link\' button', function () {
		// Login the account
		UserLoginPage.login( username2, password2 );

		// Open Homepage
		HomepagePage.open();

		// Click on 'Get a new link' button
		HomepagePage.startemailbutton.click();

		assert( browser.getUrl().toString().includes( 'Special:ConfirmEmail' ) );
	} );

	it( '[Start-017][Email] Verify removing email address', function () {
		// Login the account
		UserLoginPage.login( username2, password2 );

		// Open Homepage
		HomepagePage.open();

		// Click on Change link
		HomepagePage.startemailchangelink.click();

		// Click on "Change or remove email address" button
		PreferencesPage.changeemailbutton.click();
		ChangeEmailPage.changebutton.click();

		HomepagePage.open();
		assert.strictEqual( HomepagePage.startemailtitle.getText(), 'Add your email' );
	} );

	it( '[Start-018][Email] Verify the title when the user has a confirmed email address…', function () {
		// Login the account
		UserLoginPage.loginAdmin();

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailtitle.getText(), 'Email added' );
	} );

	it( '[Start-019][Email] Verify the text when the user has a confirmed email address…', function () {
		// Login the account
		UserLoginPage.loginAdmin();

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailtext.getText(),
			'Your email has been confirmed. You can change your email settings in Preferences.' );
	} );

	it( '[Start-020][Email] Verify the button when the user has a confirmed email address…', function () {
		// Login the account
		UserLoginPage.loginAdmin();

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startemailbutton.getText(), 'Preferences' );
	} );

	it( '[Start-021][Email] Verify clicking on \'Preferences\' button', function () {
		// Login the account
		UserLoginPage.loginAdmin();

		// Open Homepage
		HomepagePage.open();
		HomepagePage.startemailbutton.click();

		assert( browser.getUrl().toString().includes( 'Special:Preferences' ) );
	} );

	it( '[Start-022][Tutorial] Verify the title when a user has not clicked on the button…', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.starttutorialtitle.getText(), 'Learn to edit' );
	} );

	it( '[Start-023][Tutorial] Verify the text when a user has not clicked on the button…', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.starttutorialtext.getText(), 'Follow a quick tutorial to learn how to edit Wikipedia' );
	} );

	it( '[Start-024][Tutorial] Verify the button when a user has not clicked on the button…', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.starttutorialbutton.getText(), 'Tutorial' );
	} );

	it( '[Start-025][Tutorial] Verify clicking on the \'Tutorial\' button', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();
		HomepagePage.starttutorialbutton.click();

		assert( browser.getUrl().toString().includes( 'Tutorial' ) );
	} );

	it( '[Start-028][Editing] Verify the title', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startedittitle.getText(), 'Start editing' );
	} );

	it( '[Start-029][Editing] Verify the text message', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.startedittext.getText(),
			'Wikipedia is written by people like you. Even small edits make a difference.' );
	} );

	it( '[Start-030][Editing] Verify the button', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();

		assert.strictEqual( HomepagePage.starteditbutton.getText(), 'See suggested edits' );
	} );

	it( '[Start-031][Editing] Verify "See suggested edits" button when select \'Cancel\'', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();
		HomepagePage.starteditbutton.click();

		HomepagePage.starteditcancel.click();

		assert( HomepagePage.startedittitle.isExisting() );
	} );

	it( '[Start-032][Editing] Verify "See suggested edits" button when select \'Get suggestions\'', function () {
		// Login the account
		UserLoginPage.login( username1, password1 );

		// Open Homepage
		HomepagePage.open();
		HomepagePage.starteditbutton.click();

		HomepagePage.starteditgetsuggestions.click();

		HomepagePage.startedittitle.waitForVisible();

		assert.strictEqual( HomepagePage.startedittitle.isExisting(), false );
	} );

	it( '[Start-033][Overall] Verify module title when all the sub-sections have been completed.', function () {
		// Login the account
		UserLoginPage.loginAdmin();

		// Open Homepage
		HomepagePage.open();
		HomepagePage.starttutorialbutton.click();

		HomepagePage.open();
		if ( HomepagePage.starteditbutton.isExisting() ) {
			HomepagePage.starteditbutton.click();
			HomepagePage.starteditgetsuggestions.click();
			HomepagePage.startedittitle.waitForExist();
		}
		assert.strictEqual( HomepagePage.starttitle.getText(), 'First steps complete.' );
	} );
} );

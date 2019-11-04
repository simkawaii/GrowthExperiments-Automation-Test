const Page = require( 'wdio-mediawiki/Page' );

class HomepagePage extends Page {
	get homepage() { return browser.element( '#ca-homepage' ); }
	get firstheading() { return $( '#firstHeading' ); }

	// Start module elements
	get starttitle() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/h2/div[2]' ); }

	get startaccounttitle() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[1]/h3/div[2]' ); }
	get startaccountusername() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[1]/div/div[1]/div/span[1]' ); }
	get startaccountedits() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[1]/div/div[1]/div/span[2]' ); }
	get startaccounttext() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[1]/div/div[2]' ); }

	get startemailtitle() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[2]/h3/div[2]' ); }
	get startemailtext() { return $('//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[2]/div[1]' ); }
	get startemailchangelink() { return $( '=(change)' ); }
	get startemailbutton() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[2]/div[2]/span' ); }
	get startemailaddress() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[2]/div[1]/div/span' ); }

	get starttutorialtitle() { return $( '//div[3][@id=\'mw-content-text\']/div[1]/div[1]/div[1]/div/div[3]/h3/div[2]' ); }
	get starttutorialtext() { return $( '//div[3][@id=\'mw-content-text\']/div[1]/div[1]/div[1]/div/div[3]/div[1]' ); }
	get starttutorialbutton() { return $( '#mw-ge-homepage-tutorial-cta' ); }

	get startedittitle() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[4]/h3/div[2]' ); }
	get startedittext() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[4]/div[1]' ); }
	get starteditbutton() { return $( '//div[3][@id=\'mw-content-text\']/div/div[1]/div[1]/div/div[4]/div[2]/span/a' ); }
	get starteditcancel() { return $( '/html/body/div[6]/div/div[1]/div[2]/div[3]/div/span[1]/a/span[2]' ); }
	get starteditgetsuggestions() { return $( '/html/body/div[6]/div/div[1]/div[2]/div[3]/div/span[4]/a/span[2]' ); }

	open() {
		super.openTitle( 'Special:Homepage' );
	}
}

module.exports = new HomepagePage();

/**
 * This file defines the root module of the Angular 1 of the application.
 */

//Angular and other libraries imports
import * as $ from 'jquery'
import * as angular from 'angular'
import * as ngCookies from 'angular-cookies'
import * as ngSanitize from 'angular-sanitize'
import * as uibootstraptypeahead from 'angular-ui-bootstrap'
import * as vcRecaptcha from 'angular-recaptcha'
import 'angular-route'

//User generated imports
import { AffiliationModule } 
    from './affiliation/affiliation.ts';
import { AlsoKnownAsModule } 
    from './alsoKnownAs/alsoKnownAs.ts';
import { AlsoKnownAsFormModule } 
    from './alsoKnownAsForm/alsoKnownAsForm.ts';
import { BiographyModule } 
    from './biography/biography.ts';
import { CountryModule } 
    from './country/country.ts';
import { CountryFormModule } 
    from './countryForm/countryForm.ts';
import { EmailUnverifiedWarningModule } 
    from './emailUnverifiedWarning/emailUnverifiedWarning.ts';
import { EmailVerificationSentMesssageModule } 
    from './emailVerificationSentMessage/emailVerificationSentMessage.ts';
import { FundingModule } 
    from './funding/funding.ts';
import { KeywordsFormModule } 
    from './keywordsForm/keywordsForm.ts';
import { KeywordsModule } 
    from './keywords/keywords.ts';
import { ModalModule } 
    from './modalNg2/modal-ng.ts';
import { NameModule } 
    from './name/name.ts';
import { ThanksForRegisteringModule } 
    from './thanksForRegistering/thanksForRegistering.ts';
import { ThanksForVerifyingModule } 
    from './thanksForVerifying/thanksForVerifying.ts';
import { WidgetModule } 
    from './widget/widget.ts';
import { WorksPrivacyPreferencesModule } 
    from './worksPrivacyPreferences/worksPrivacyPreferences.ts'

export const orcidApp = angular.module(
    'orcidApp', 
    [
        ngCookies,
        ngSanitize, 
        vcRecaptcha,
        uibootstraptypeahead,
        AffiliationModule.name,
        AlsoKnownAsModule.name,
        AlsoKnownAsFormModule.name,
        BiographyModule.name,
        CountryModule.name,
        CountryFormModule.name,
        EmailUnverifiedWarningModule.name,
        EmailVerificationSentMesssageModule.name,
        //FundingModule.name,
        KeywordsFormModule.name,
        KeywordsModule.name,
        ModalModule.name,
        NameModule.name,
        ThanksForRegisteringModule.name,
        ThanksForVerifyingModule.name,
        WidgetModule.name,
        WorksPrivacyPreferencesModule.name
    ]
);


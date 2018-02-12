<#--

    =============================================================================

    ORCID (R) Open Source
    http://orcid.org

    Copyright (c) 2012-2014 ORCID, Inc.
    Licensed under an MIT-Style License (MIT)
    http://orcid.org/open-source-license

    This copyright and license information (including a link to the full license)
    shall be included in its entirety in all copies or substantial portion of
    the software.

    =============================================================================

-->
<ul id="educations-and-qualifications-list" ng-hide="!affiliationsSrvc.educations_qualifications.length" class="workspace-affiliations workspace-body-list bottom-margin-medium" ng-cloak>
	<li class="bottom-margin-small workspace-border-box affiliation-box card ng-scope" ng-repeat="group in affiliationsSrvc.educations_qualifications | orderBy:sortState.predicate:sortState.reverse" education-qualification-put-code="{{group.getActive().putCode.value}}"> 
		    <#include "aff_row_inc_v3.ftl" />
	</li>
</ul>
<div ng-if="affiliationsSrvc.loading" class="text-center">
    <i class="glyphicon glyphicon-refresh spin x4 green" id="spinner"></i>
    <!--[if lt IE 8]>    
    	<img src="${staticCdn}/img/spin-big.gif" width="85" height ="85"/>
    <![endif]-->
</div>
<div ng-if="affiliationsSrvc.loading == false && affiliationsSrvc.educations_qualifications.length == 0" ng-cloak>
    <strong>
    	<#if (publicProfile)?? && publicProfile == true>
    		<@orcid.msg 'workspace_affiliations_body_list.Noeducationnorqualificationaddedyet' />
    	<#else>
    		<@orcid.msg 'workspace_affiliations_body_list.havenotaddedanyelement' /> <a ng-click="addAffiliationModal('education')"><@orcid.msg 'workspace_affiliations_body_list.addeducationnow' /></a> <@orcid.msg 'common.or' /> <a ng-click="addAffiliationModal('qualification')"><@orcid.msg 'workspace_affiliations_body_list.addqualificationnow' /></a>
    	</#if>
    </strong>
</div>		

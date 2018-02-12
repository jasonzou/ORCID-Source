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
<div class="workspace-accordion-header clearfix">
    <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
            <a name='workspace-education-and-qualification' />
            <a href="" ng-click="workspaceSrvc.toggleEducationAndQualification($event)"class="toggle-text">
                <i class="glyphicon-chevron-down glyphicon x075" ng-class="{'glyphicon-chevron-right':workspaceSrvc.displayEducationAndQualification==false}"></i>
                <@orcid.msg 'org.orcid.jaxb.model.message.AffiliationType.education_qualification'/> (<span ng-bind="affiliationsSrvc.educations_qualifications.length"></span>)
            </a>
            <#if !(isPublicProfile??)> 
                <div class="popover-help-container">
                    <a href="javascript:void(0);"><i class="glyphicon glyphicon-question-sign"></i></a>
                    <div id="education-help" class="popover bottom">
                        <div class="arrow"></div>
                        <div class="popover-content">
                            <p><@orcid.msg 'manage_affiliations_settings.helpPopoverEducation'/> <a href="${knowledgeBaseUri}/articles/1807522" target="manage_affiliations_settings.helpPopoverEducation"><@orcid.msg 'common.learn_more'/></a></p>
                        </div>
                    </div>
                </div>  
            </#if>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12 action-button-bar" ng-if="workspaceSrvc.displayEducationAndQualification">
            <#include "../workspace/workspace_act_sort_menu.ftl"/>                    
            <#if !(isPublicProfile??)>
                <ul class="workspace-bar-menu">                         
                    <!-- Link Manually -->
                    <li class="hidden-xs">                  
                    	<div class="menu-container" id="add-education-container">
	                    	<ul class="toggle-menu">
	                    		<li ng-class="{'green-bg' : showBibtexImportWizard == true}">       
			                    	<span class="glyphicon glyphicon-plus"></span>
				                    <@orcid.msgCapFirst 'manual_affiliation_form_contents.add_education'/>
				                    <ul class="menu-options education">	                    	
					                    <!-- Add Manually -->
					                    <li>          
					                        <a id="add-education" href="" class="action-option manage-button two-options" ng-click="addAffiliationModal('education')">
					                            <span class="glyphicon glyphicon-plus"></span>
					                            <@orcid.msg 'manual_orcid_record_contents.link_manually'/>
					                        </a>
					                   </li>
					                </ul>
					             </li>
					      </ul>
					    </div>         
                    </li>
                    <!-- Mobile Workaround -->                    
                    <li class="hidden-md hidden-sm visible-xs-inline">          
                       <a href="" class="action-option manage-button two-options" ng-click="addAffiliationModal('education')">
                           <span class="glyphicon"><@orcid.msgCapFirst 'manual_affiliation_form_contents.add_education'/></span>                           
                       </a>
                   </li>		                                    
                </ul>
                <ul class="workspace-bar-menu">                         
                    <!-- Link Manually -->
                    <li class="hidden-xs">                  
                    	<div class="menu-container" id="add-qualification-container">
	                    	<ul class="toggle-menu">
	                    		<li ng-class="{'green-bg' : showBibtexImportWizard == true}">       
			                    	<span class="glyphicon glyphicon-plus"></span>
				                    <@orcid.msgCapFirst 'manual_affiliation_form_contents.add_qualification'/>
				                    <ul class="menu-options education">	                    	
					                    <!-- Add Manually -->
					                    <li>          
					                        <a id="add-qualification" href="" class="action-option manage-button two-options" ng-click="addAffiliationModal('qualification')">
					                            <span class="glyphicon glyphicon-plus"></span>
					                            <@orcid.msg 'manual_orcid_record_contents.link_manually'/>
					                        </a>
					                   </li>
					                </ul>
					             </li>
					      </ul>
					    </div>         
                    </li>
                    <!-- Mobile Workaround -->                    
                    <li class="hidden-md hidden-sm visible-xs-inline">          
                       <a href="" class="action-option manage-button two-options" ng-click="addAffiliationModal('qualification')">
                           <span class="glyphicon"><@orcid.msgCapFirst 'manual_affiliation_form_contents.add_qualification'/></span>
                       </a>
                   </li>		                                    
                </ul>
            </#if>
        </div>
    </div>
</div>

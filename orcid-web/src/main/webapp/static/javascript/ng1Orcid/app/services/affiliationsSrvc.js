angular.module('orcidApp').factory("affiliationsSrvc", ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    var serv = {
        distinctions_invited_positions: new Array(),
        educations_qualifications: new Array(),
        educations: new Array(),
        employments: new Array(),
        memberships_services: new Array(),       
        loading: false,
        affiliationsToAddIds: null,
        
        addAffiliationToScope: function(path) {
            if( serv.affiliationsToAddIds.length != 0 ) {
                var affiliationIds = serv.affiliationsToAddIds.splice(0,20).join();
                var url = getBaseUri() + '/' + path + '?affiliationIds=' + affiliationIds;                
                $.ajax({
                    url: url,                        
                    headers : {'Content-Type': 'application/json'},
                    method: 'GET',
                    success: function(data) {
                        for (i in data) {
                            if (data[i].affiliationType != null && data[i].affiliationType.value != null
                                    && data[i].affiliationType.value == 'distinction'){
                                groupedActivitiesUtil.group(data[i],GroupedActivities.AFFILIATION,serv.distinctions_invited_positions);
                            } else if (data[i].affiliationType != null && data[i].affiliationType.value != null
                                    && data[i].affiliationType.value == 'education'){
                                groupedActivitiesUtil.group(data[i],GroupedActivities.AFFILIATION,serv.educations_qualifications);
                                //TODO: Remove when new aff types are live
                                groupedActivitiesUtil.group(data[i],GroupedActivities.AFFILIATION,serv.educations);                                
                            } else if (data[i].affiliationType != null && data[i].affiliationType.value != null
                                    && data[i].affiliationType.value == 'employment'){
                                groupedActivitiesUtil.group(data[i],GroupedActivities.AFFILIATION,serv.employments);
                            } else if (data[i].affiliationType != null && data[i].affiliationType.value != null
                                    && data[i].affiliationType.value == 'invited-position'){
                                groupedActivitiesUtil.group(data[i],GroupedActivities.AFFILIATION,serv.distinctions_invited_positions);
                            } else if (data[i].affiliationType != null && data[i].affiliationType.value != null
                                    && data[i].affiliationType.value == 'membership'){
                                groupedActivitiesUtil.group(data[i],GroupedActivities.AFFILIATION,serv.memberships_services);
                            } else if (data[i].affiliationType != null && data[i].affiliationType.value != null
                                    && data[i].affiliationType.value == 'qualification'){
                                groupedActivitiesUtil.group(data[i],GroupedActivities.AFFILIATION,serv.educations_qualifications);
                                //TODO: Remove when new aff types are live
                                groupedActivitiesUtil.group(data[i],GroupedActivities.AFFILIATION,serv.educations);
                            } else if (data[i].affiliationType != null && data[i].affiliationType.value != null
                                    && data[i].affiliationType.value == 'service'){
                                groupedActivitiesUtil.group(data[i],GroupedActivities.AFFILIATION,serv.memberships_services);
                            } 
                        };
                        if (serv.affiliationsToAddIds.length == 0) {
                            $timeout(function() {
                              serv.loading = false;
                            });
                        } else {
                            $timeout(
                                function () {
                                    serv.addAffiliationToScope(path);
                                },
                                50
                            );
                        }
                    }
                }).fail(function(e) {
                    console.log("Error adding affiliations to scope")
                    logAjaxError(e);
                });
            } else {
                serv.loading = false;
            };
        },
        setIdsToAdd: function(ids) {
            serv.affiliationsToAddIds = ids;
        },
        getAffiliations: function(path) {
            //clear out current affiliations
            serv.loading = true;
            serv.affiliationsToAddIds = null;
            serv.distinctions_invited_positions.length = 0;
            serv.educations_qualifications.length = 0;
            serv.educations.length = 0;
            serv.employments.length = 0;
            serv.memberships_services.length = 0;
            //get affiliation ids
            $.ajax({
                url: getBaseUri() + '/' + path,
                dataType: 'json',
                success: function(data) {
                    $timeout(function(){
                        serv.affiliationsToAddIds = data;
                        serv.addAffiliationToScope('affiliations/affiliations.json');
                    });
                }
            }).fail(function(e){
                // something bad is happening!
                console.log("error fetching affiliations");
                logAjaxError(e);
            });
        },
        updateProfileAffiliation: function(aff) {
            $.ajax({
                url: getBaseUri() + '/affiliations/affiliation.json',
                type: 'PUT',
                data: angular.toJson(aff),
                contentType: 'application/json;charset=UTF-8',
                dataType: 'json',
                success: function(data) {
                    if(data.errors.length != 0){
                        $timeout(function(){ 
                            console.log("Unable to update profile affiliation.");
                        });
                    }
                }
            }).fail(function() {
                console.log("Error updating profile affiliation.");
            });
        },
        deleteAffiliation: function(affiliation) {
            var arr = null;
            var tempArr = null;
            var idx;
            if(affiliation.affiliationType != null && affiliation.affiliationType.value != null) {
                if(affiliation.affiliationType.value == 'distinction') {
                   arr = serv.distinctions_invited_positions; 
                } else if (affiliation.affiliationType.value == 'education'){
                    arr = serv.educations_qualifications;
                    tempArr = serv.educations;
                } else if (affiliation.affiliationType.value == 'employment'){
                    arr = serv.employments;
                } else if(affiliation.affiliationType.value == 'invited-position') {
                    arr = serv.distinctions_invited_positions; 
                } else if(affiliation.affiliationType.value == 'membership') {
                    arr = serv.memberships_services;
                } else if(affiliation.affiliationType.value == 'qualification') {
                    arr = serv.educations_qualifications;
                    tempArr = serv.educations;
                } else if(affiliation.affiliationType.value == 'service') {
                    arr = serv.memberships_services;
                }
            }                         
            
            for (idx in arr) {
                if (arr[idx].activePutCode == affiliation.putCode.value) {
                    break;
                }
            }
            
            arr.splice(idx, 1);
            
            //TODO: Remove this section when new aff types are live
            if(tempArr != null) {
                for (tempIdx in tempArr) {
                    if (tempArr[tempIdx].activePutCode == affiliation.putCode.value) {
                        break;
                    }
                }
            }
            tempArr.splice(tempIdx, 1);
            //-------------------------------------------------------
            
            $.ajax({
                url: getBaseUri() + '/affiliations/affiliations.json',
                type: 'DELETE',
                data: angular.toJson(affiliation),
                contentType: 'application/json;charset=UTF-8',
                dataType: 'json',
                success: function(data) {
                    $timeout(function() {
                        if(data.errors.length != 0){
                            console.log("Unable to delete affiliation.");
                        }
                    });
                }
            }).fail(function() {
                console.log("Error deleting affiliation.");
            });
        }
    };
    return serv;
}]);
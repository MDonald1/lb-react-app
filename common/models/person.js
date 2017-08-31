'use strict';

module.exports = function(Person) {
  Person.observe('after save', function(ctx, next) {
    if(ctx.instance && ctx.isNewInstance) {
      console.log("new user created. Creating filter and search settings")
      
      var userId = ctx.instance.id

      var filterSettings = Person.app.models.filterSettings
      var searchSettings = Person.app.models.searchSettings

      filterSettings.create({
        countries: [],
        terms: [],
        personId: userId
      }, function(err, settings) {
        if (err) console.log(err)
          console.log("New filter settings created for user %s", userId)
        searchSettings.create({
          q: "",
          title: "",
          skills: [],
          job_type: "",
          duration: "",
          workload: "",
          job_status: "",
          personId: userId
        }, function(err, settings) {
          if (err) console.log(err)
          console.log("New search settings created for user %s", userId)
        }
        )
      })

    }
    
    next();
  })
};

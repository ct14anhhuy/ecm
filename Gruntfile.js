module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      src: {
        files: [
          "src/assets/css/*.css",
          "src/components/*.css",
          "src/components/**/*.css",
        ],
        tasks: ["default"],
      },
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1,
        level: {
          2: {
            removeDuplicateRules: true,
            removeUnusedAtRules: true,
          },
        },
      },
      AddEditModule: {
        files: {
          "src/assets/css/modules/AddEdit.module.css": [
            "src/assets/css/layout.css",
            "src/assets/css/calenda.css",
            "src/assets/css/ecm_popup.css",
            "src/components/register/AddEdit.css",
          ],
        },
      },
      RoleAssignEditModule: {
        files: {
          "src/assets/css/modules/RoleAssignEdit.module.css": [
            "src/assets/css/layout.css",
            "src/assets/css/ecm_popup.css",
            "src/assets/css/popColumnR.css",
            "src/components/register/RoleAssignEdit.css",
          ],
        },
      },
      LeftMenuModule: {
        files: {
          "src/assets/css/modules/LeftMenu.module.css": [
            "src/assets/css/layout.css",
            "src/components/LeftMenu.css",
          ],
        },
      },
      CreateDirectoryModule: {
        files: {
          "src/assets/css/modules/CreateDirectory.module.css": [
            "src/assets/css/layout.css",
            "src/assets/css/ecm_popup.css",
            "src/assets/css/calenda.css",
            "src/components/CreateDirectory.css",
          ],
        },
      },
      OpenContentModule: {
        files: {
          "src/assets/css/modules/OpenContent.module.css": [
            "src/assets/css/layout.css",
            "src/assets/css/popup.css",
            "src/assets/css/contents.css",
          ],
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("runwatch", ["watch"]);
  grunt.registerTask("default", ["cssmin"]);
};

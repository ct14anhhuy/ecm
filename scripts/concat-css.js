const shell = require("shelljs");

shell.exec("css-purge -i \"src/assets/css/layout.css, src/assets/css/calenda.css, src/assets/css/ecm_popup.css, src/components/register/AddEdit.css\" -o src/assets/css/modules/AddEdit.module.css");
shell.exec("css-purge -i \"src/assets/css/layout.css, src/assets/css/ecm_popup.css, src/assets/css/popColumnR.css, src/components/register/RoleAssignEdit.css\" -o src/assets/css/modules/RoleAssignEdit.module.css");
shell.exec("css-purge -i \"src/assets/css/layout.css, src/components/LeftMenu.css\" -o src/assets/css/modules/LeftMenu.module.css");
shell.exec("css-purge -i \"src/assets/css/layout.css, src/assets/css/ecm_popup.css, src/assets/css/calenda.css, src/components/CreateDirectory.css\" -o src/assets/css/modules/CreateDirectory.module.css");
shell.exec("css-purge -i \"src/assets/css/layout.css, src/assets/css/popup.css, src/assets/css/contents.css, src/components/OpenContent.css\" -o src/assets/css/modules/OpenContent.module.css");
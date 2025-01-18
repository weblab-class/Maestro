const soundPath = "../../../src/assets/";

// Define a template for the objects
const guyTemplates = [
  {
    guy_name: "default_guy",
    _id: "default",
    asset_id: "2795",
    sound: "default.mp3",
  },
  {
    guy_name: "monkey_guy",
    _id: "monkey",
    asset_id: "1f412",
    sound: "monkey.mp3",
  },
  {
    guy_name: "goat_guy",
    _id: "goat",
    asset_id: "1f410",
    sound: "goat.mp3",
  },
  {
    guy_name: "dog_guy",
    _id: "dog",
    asset_id: "1f415",
    sound: "dog.mp3",
  },
];

// Generate the defaultGuyList dynamically
const defaultGuyList = Array.from({ length: 38 }, (_, index) => {
  const template = guyTemplates[index % guyTemplates.length];
  return {
    ...template,
    creator_id: "Smelvin",
    sound: soundPath + template.sound,
  };
});

module.exports = defaultGuyList;

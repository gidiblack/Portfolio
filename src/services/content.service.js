const Hero = require("../models/Hero");
const About = require("../models/About");
const Service = require("../models/Service");
const Project = require("../models/Project");
const SocialLink = require("../models/SocialLink");
const ResumeAsset = require("../models/ResumeAsset");

async function getContent() {
  const hero = await Hero.findOne().sort({ order: 1 });
  const about = await About.findOne().sort({ order: 1 });
  const services = await Service.find({ published: true }).sort({ order: 1 });
  const socialLinks = await SocialLink.find({ published: true }).sort({ order: 1 });
  const resumeAsset = await ResumeAsset.findOne();
  const projects = await Project.find({ published: true }).sort({ order: 1 });
  if (resumeAsset && resumeAsset.currentUrl === "/assets/resume/default.pdf") {
    resumeAsset.currentUrl = "/assets/Gideon_Etim_Resume.pdf";
  }

  return {
    hero,
    about,
    services,
    socialLinks,
    resumeAsset,
    projects,
  };
}

module.exports = { getContent };

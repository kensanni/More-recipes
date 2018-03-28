/* eslint-disable*/
const faker = require('faker');


const randomName = faker.name.findName();
const randomEmail = faker.internet.email();



const baseUrl = 'http://localhost:8000';
module.exports = {
  'Test signup password field': (browser) => {
    browser
      .url(`${baseUrl}/signup`)
      .pause(10000)      
      .setValue('input[name="name"]', randomName)
      .pause(1000)
      .setValue('input[name="username"]', 'sanni675')
      .pause(1000)
      .setValue('input[name="email"]', randomEmail)
      .pause(1000)
      .setValue('input[name="password"]', 'Test@123')
      .pause(1000)
      .setValue('input[name="confirmPassword"]', 'htututjtuttu')
      .pause(1000)
      .click('.btn.btn-block.btn-orange')
      .assert.containsText('.text-left.sign', 'Forgotten your password?')
      .assert.containsText('.btn.btn-block.btn-orange', 'Create Account')      
      .pause(500);
  },
  'Test signup name field': (browser) => {
    browser
      .url(`${baseUrl}/signup`)
      .setValue('input[name="name"]', '')
      .pause(1000)
      .setValue('input[name="username"]', 'sanni675')
      .pause(1000)
      .setValue('input[name="email"]', randomEmail)
      .pause(1000)
      .setValue('input[name="password"]', '123456789')
      .pause(1000)
      .setValue('input[name="confirmPassword"]', '123456789')
      .pause(1000)
      .click('.btn.btn-block.btn-orange')
      .pause(500)
      .assert.visible('.error-message');
  },
  'Test signup user successful': (browser) => {
    browser
      .url(`${baseUrl}/signup`)
      .setValue('input[name="name"]', randomName)
      .pause(1000)
      .setValue('input[name="username"]', 'DevessslOps')
      .pause(1000)
      .setValue('input[name="email"]', randomEmail)
      .pause(1000)
      .setValue('input[name="password"]', '123456789')
      .pause(1000)
      .assert.visible('input[name="password"]')            
      .setValue('input[name="confirmPassword"]', '123456789')
      .pause(1000)
      .click('.btn.btn-block.btn-orange')
      .pause(10000)
  },
  'Test user logout': (browser) => {
    browser
      .url(`${baseUrl}/recipes`)
      .click('.navbar-link.nav-text.signout')
      .pause(10000);
  },
  'Test signin username field': (browser) => {
    browser
      .url(`${baseUrl}/signin`)
      .pause(1000)
      .setValue('input[name="username"]', '')
      .pause(1000)
      .setValue('input[name="password"]', '123456789')
      .pause(1000)
      .click('.btn.btn-block.btn-orange')
      .pause(500)
      .assert.visible('.error-message')
      .assert.visible('input[name="username"]')
      .assert.visible('input[name="password"]')
  },
  'Test signin password field': (browser) => {
    browser
      .url(`${baseUrl}/signin`)
      .pause(1000)
      .setValue('input[name="username"]', 'developerTest')
      .pause(1000)
      .setValue('input[name="password"]', '')
      .pause(1000)
      .click('.btn.btn-block.btn-orange')
      .assert.visible('.error-message')
      .assert.visible('input[name="username"]')
      .assert.visible('input[name="password"]')
      .pause(500)
  },
  'Test signin with invalid details': (browser) => {
    browser
      .url(`${baseUrl}/signin`)
      .pause(1000)
      .setValue('input[name="username"]', 'developerTest')
      .pause(1000)
      .setValue('input[name="password"]', '12345bf46789')
      .pause(1000)
      .click('.btn.btn-block.btn-orange')
      .pause(500)
      .assert.visible('.error-message')
      .assert.visible('input[name="username"]')
      .assert.visible('input[name="password"]')
    },
  'Test successful signin': (browser) => {
    browser
      .url(`${baseUrl}/signin`)
      .pause(1000)
      .setValue('input[name="username"]', 'developerTest')
      .pause(1000)
      .setValue('input[name="password"]', '123456789')
      .pause(1000)
      .assert.visible('input[name="username"]')
      .assert.visible('input[name="password"]')
      .click('.btn.btn-block.btn-orange')
      .pause(8000)
  }, 
  'Test Recipe details page and voting functionality': (browser) => {
    browser
      .url(`${baseUrl}/recipes/43`)
      .pause(7000)
      .click('.btn.btn-orange.mr-2.up.favorite-btn')
      .pause(4000)
      .click('.btn.btn-orange.mr-2.down.favorite-btn')
      .pause(4000)
      .click('.btn.btn-orange.mr-2.favorite')
      .pause(4000)
      .assert.visible('.btn.btn-orange.mr-2.favorite')
      .assert.visible('.btn.btn-orange.mr-2.up.favorite-btn')
      .assert.visible('.btn.btn-orange.mr-2.down.favorite-btn')
      .pause(5000)
  },
  'Test reviews functionality and user profile': (browser) => {
    browser
      .url(`${baseUrl}/recipes/43`)
      .pause(7000)
      .setValue('textarea[name="review"]', 'Yummy yummy')
      .pause(7000)      
      .click('.btn.btn-orange.rfloat.mt-3')
      .pause(7000)
      .assert.visible('textarea[name="review"]')
      .assert.containsText('.btn.btn-orange.rfloat.mt-3', 'Submit')
      .click('.nav-link.dropdown-toggle.nav-text')
      .pause(2000)
      .click('.dropdown-item.nav-text')
      .pause(7000)      
      .assert.visible('.col-sm-12.profile-bg.user-profile')
      .assert.visible('.vl.ml-2.user-text.favorite')
      .back()
      .pause(7000)      
      .click('.btn.btn-orange.mr-2.favorite')
      .pause(3000)      
      .click('.nav-link.dropdown-toggle.nav-text')
      .pause(2000)
      .click('.dropdown-item.nav-text')
      .pause(5000)
  },
  'Testing user add recipe functionality': (browser) => {
    browser
      .url(`${baseUrl}/my-recipes`)
      .pause(3000)
      .click('.btn.rfloat.mt-2')
      .pause(2000)
      .click('.form-group.img-text') 
      .pause(15000)
      .setValue('input[name="name"]', randomName)
      .pause(2000)
      .setValue('textarea[name="description"]', 'Yummy yummy')
      .pause(2000)
      .setValue('input[name="ingredient"]', 'rice, yummy')
      .pause(2000)
      .click('.btn.btn-orange')
      .pause(5000)      
  },
  'Testing user edit recipe functionality': (browser) => {
    browser
      .url(`${baseUrl}/my-recipes`)
      .pause(3000)
      .click('.btn.edit-button') 
      .pause(1000)
      .clearValue('#editModal input[name="name"]')
      .pause(1000)      
      .setValue('#editModal input[name="name"]', 'Edited now')
      .pause(2000)
      .clearValue('#editModal textarea[name="description"]')
      .pause(1000)
      .setValue('#editModal textarea[name="description"]', 'Yummy delicious')
      .pause(2000)
      .click('.btn.btn-orange.editmodal')
      .pause(5000)      
  },
  'Test delete recipe functionality': (browser) => {
    browser
      .url(`${baseUrl}/my-recipes`)
      .pause(3000)
      .click('.btn.btn-danger.ml-3') 
      .pause(1000)
      .click('#del.btn.btn-danger')
      .pause(10000)      
      .end()
  }
};
// .end();

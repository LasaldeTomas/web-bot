node{
  stage('Checkout SCM'){
    git branch: 'main', url: 'https://github.com/LasaldeTomas/web-bot.git'
  }
  
  stage('Install node modules'){
    sh "npm install"
  }
  
  stage("Test"){
    sh "npm run test-headless --prod"
  }
  
  stage("Build"){
    sh "npm run build --prod"
  }
  
  //stage("Copy"){
    //sh "cp -a /var/lib/jenkins/jobs/Deploy-Eventos/builds/. /var/www/main/html/*"
  //}
}

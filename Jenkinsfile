pipeline{

  agent {
        label 'master'
    }

  environment { 
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
    }
  stages{
    //stage('Checkout SCM'){
      //steps {
        //git branch: 'main', url: 'https://github.com/LasaldeTomas/web-bot.git'
      //}
    //}
    
    stage('Install node modules'){
      steps{
        sh "npm ci"
      }
    }
    
    stage("Build"){
      steps{
        sh "npm run build --prod"
      }
    }

    stage("Deploy"){
      steps{
        sh "npm install firebase-tools"
        sh "firebase deploy --only hosting --token 1//0hpN9ju3lbJhFCgYIARAAGBESNwF-L9IrcLGX80H2drKsLUfWDZDQZRUhpvz8GqSa75bTW8xJebLxlumV2Y6B7XuxQ0375qE8Zgw"
      }
    }
  
  //stage("Copy"){
    //sh "cp -a /var/lib/jenkins/jobs/Deploy-Eventos/builds/. /var/www/main/html/*"
  //}
  }
}

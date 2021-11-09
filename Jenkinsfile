pipeline{

  agent {
        label 'master'
    }

  environment { 
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
    }
  always {
    cleanWs()
    dir("${env.WORKSPACE}@tmp") {
      deleteDir()
    }
    dir("${env.WORKSPACE}@script") {
      deleteDir()
    }
    dir("${env.WORKSPACE}@script@tmp") {
      deleteDir()
    }
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
        sh "npm install firebase-tools firebase"
        sh "firebase deploy --only hosting --token $FIREBASE_TOKEN"
      }
    }
  
  //stage("Copy"){
    //sh "cp -a /var/lib/jenkins/jobs/Deploy-Eventos/builds/. /var/www/main/html/*"
  //}
  }
}

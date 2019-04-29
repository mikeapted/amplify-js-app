import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import API from '@aws-amplify/api';

import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

const AnalyticsResult = document.getElementById('AnalyticsResult');
const AnalyticsEventButton = document.getElementById('AnalyticsEventButton');
let EventsSent = 0;

AnalyticsEventButton.addEventListener('click', (evt) => {
  Analytics.record('Amplify Tutorial Event')
    .then( (evt) => {
      const url = 'https://'+awsconfig.aws_mobile_analytics_app_region+'.console.aws.amazon.com/pinpoint/home/?region='+awsconfig.aws_mobile_analytics_app_region+'#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
      AnalyticsResult.innerHTML = '<p>Event Submitted.</p>';
      AnalyticsResult.innerHTML += '<p>Events sent: '+(++EventsSent)+'</p>';
      AnalyticsResult.innerHTML += '<a href="'+url+'" target="_blank">View Events on the Amazon Pinpoint Console</a>';
    });
});

let apiName = 'apife6bb67f';
let path = '/hello/dolly'; 
let myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
        name: 'param'
    }
};

API.get(apiName, path, myInit).then(response => {
    // Add your code here
    console.log('API response', response);
}).catch(error => {
    console.log('API error', error.response);
});
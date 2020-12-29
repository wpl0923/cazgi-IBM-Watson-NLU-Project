const express = require('express');
const app = new express();
const dotenv = require('dotenv');
const { IamAuthenticator } = require('ibm-watson/auth');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

dotenv.config();

function getLanguageTranslator() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url
    })
    return naturalLanguageUnderstanding;
}

const naturalLanguageUnderstanding = getLanguageTranslator();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    getLanguageTranslator();
    const analyzeParams = {
    'url': req.query.url,
    'features': {
        'emotion': {}
    }
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        const emotion = analysisResults.result.emotion.document.emotion;
        return res.send(emotion);
    })
    .catch(err => {
        console.log('error:', err);
    });
});

app.get("/url/sentiment", (req, res) => {
const analyzeParams = {
  'url': req.query.url,
  'features': {
    'sentiment': {}
  }
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    const sentiment = analysisResults.result.sentiment.document.label;
    return res.send(sentiment);
  })
  .catch(err => {
    console.log('error:', err);
  });
});

app.get("/text/emotion", (req, res) => {
    getLanguageTranslator();
    const analyzeParams = {
    'text': req.query.text,
    'features': {
        'emotion': {}
    }
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        const emotion = analysisResults.result.emotion.document.emotion;
        return res.send(emotion);
    })
    .catch(err => {
        console.log('error:', err);
    });
});

app.get("/text/sentiment", (req, res) => {
const analyzeParams = {
  'text': req.query.text,
  'features': {
    'sentiment': {}
  }
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    const sentiment = analysisResults.result.sentiment.document.label;
    return res.send(sentiment);
  })
  .catch(err => {
    console.log('error:', err);
  });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})


import * as React from 'react';

// MUI imports
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { separateList } from '../helpers/word-generators';

// Styling constants
const BOX_STYLE = {
  bgcolor: '#cfe8fc',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
};

const FIELD_STYLE = {
  width: '300px',
  marginTop: '22px',
};

// Generate phrase component - display the original sentence in a list
const GeneratedPhrase = ({ generatedList }) => {
  return (
    <>
      {generatedList.length !== 0 && (
        <Typography
          variant='subtitle2'
          gutterBottom
          sx={{ marginTop: '12px', color: 'red' }}
        >
          Generated list:
        </Typography>
      )}
      {generatedList.length !== 0 &&
        generatedList.map((word, index) => (
          <Typography
            variant='subtitle2'
            gutterBottom
            key={index}
            sx={{ color: 'red' }}
          >
            {`${word} ${index === generatedList.length - 1 ? '' : ','}`}
          </Typography>
        ))}
    </>
  );
};

// Display all inserted words component
const WordDisplay = ({ currentWords }) => {
  return (
    <>
      {currentWords.length !== 0 && (
        <Typography variant='subtitle2' gutterBottom sx={{ marginTop: '12px' }}>
          Current words in list:
        </Typography>
      )}
      {currentWords.length !== 0 &&
        currentWords.map((word, index) => (
          <Typography variant='subtitle2' gutterBottom key={index}>
            {`${word} ${index === currentWords.length - 1 ? '' : ','}`}
          </Typography>
        ))}
    </>
  );
};

// Main card. Sums up the input fields that will work to generate the phrase
export default function MainCard() {
  const [currentWord, setCurrentWord] = React.useState('');
  const [wordList, setWordList] = React.useState([]);
  const [phrase, setPhrase] = React.useState('');
  const [generatedPhraseArray, setGeneratedPhraseArray] = React.useState([]);

  const addWordToList = () => {
    const currentWords = [...wordList];

    currentWords.push(currentWord);

    setCurrentWord('');
    setWordList(currentWords);
  };

  const handleGeneratePhrase = () => {
    setPhrase('');
    setGeneratedPhraseArray(separateList(wordList, phrase));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='100%'>
        <Box sx={BOX_STYLE}>
          <Box sx={{ display: 'flex' }}>
            <TextField
              id='array-input'
              label='Insert a word'
              variant='outlined'
              sx={{ width: '300px' }}
              value={currentWord}
              onChange={(event) => {
                setCurrentWord(event.target.value.replace(/\s/g, ''));
              }}
            />
            <Button
              variant='outlined'
              sx={{ marginLeft: '8px' }}
              onClick={addWordToList}
            >
              Add word to list
            </Button>
          </Box>
          <TextField
            id='sentence-input'
            label='Insert a sentence'
            variant='outlined'
            sx={FIELD_STYLE}
            value={phrase}
            onChange={(event) => {
              setPhrase(event.target.value.replace(/\s/g, ''));
            }}
          />
          <Tooltip
            title={
              !phrase || wordList.length === 0
                ? 'You need to add some words or a phrase!'
                : ''
            }
          >
            <span>
              <Button
                variant='contained'
                sx={{ marginTop: '8px' }}
                onClick={handleGeneratePhrase}
                disabled={!phrase || wordList.length === 0}
              >
                Generate phrase
              </Button>
            </span>
          </Tooltip>
          <WordDisplay currentWords={wordList} />
          <GeneratedPhrase generatedList={generatedPhraseArray} />
        </Box>
      </Container>
    </React.Fragment>
  );
}

import { useState, memo } from 'react';
import AddMatchSummary from './AddMatchSummaryForm';
import FormItem from './FormItem';

const MatchInformationAddField = memo(() => {
  const [matchSummary, setMatchSummary] = useState({
    fighter: '',
    opponent: '',
    japaneseNotationFighter: '',
    japaneseNotationOpponent: '',
    division: '',
    date: '',
    venue: '',
    overview: '',
    file: '',
  });

  return (
    <>
      <h2 className='section-title'>Add Match</h2>
      <AddMatchSummary
        matchSummary={matchSummary}
        setMatchSummary={setMatchSummary}
      />
      <FormItem matchSummary={matchSummary} />
    </>
  );
});
export default MatchInformationAddField;

import TermsBox from "./TermsBox";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbylqhWttZ6pjomknohOmLNlBUC-JAu1KxdElZUBiFZrSZ_uQQqwKKrD3Q1eVgdY_0no/exec";

interface Props {
  onBack: () => void;
  onNext: (sheetUrl: string, sheetTarget: string) => void;
}

const InterOnline = ({ onBack, onNext }: Props) => (
  <TermsBox
    participant="international"
    competition="online"
    sheetUrl={SHEET_URL}
    sheetTarget="inter-online"
    onBack={onBack}
    onNext={onNext}
  />
);

export default InterOnline;
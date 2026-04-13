import TermsBox from "./IccTermsBox";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxRBVz45hwktXEaKac84iNHZM2YZcRTIhQxxkhnW_0SS4VfvU8kYR3gng3-yEGcoge_/exec";

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
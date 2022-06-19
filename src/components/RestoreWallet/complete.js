import { Button } from "globalComponents";

export default function CompleteStep({handleRestore}) {
  return (
    <div className="restore-complete-section">
      <center>
        <h2>You're all set!</h2>
        <p>You have successfully restored your wallet.</p>
        <p>Click Complete to finish setup.</p>
        <br />
        <Button.Primary block onClick={handleRestore}>Complete</Button.Primary>
      </center>
    </div>
  );
}

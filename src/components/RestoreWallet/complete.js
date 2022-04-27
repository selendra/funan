import React from "react";

export default function CompleteStep({handleRestore}) {
  return (
    <div className="restore-complete-section">
      <center>
        <h3>You're all set!</h3>
        <p>You have successfully restored your wallet.</p>
        <p>Click Complete to finish setup.</p>
        <div className="access-btn" onClick={handleRestore}>Complete</div>
      </center>
      {/* https://pwawallet.fantom.network/#/account/0xd6F90AA4E74355b914e526F672F5BCD149b6D865/ */}
    </div>
  );
}

import { ChoiceTrace, GeneralTrace, PathTrace } from '@voiceflow/general-types';
import { ImageStepData } from '@voiceflow/general-types/build/nodes/visual';
import React from 'react';

import { api } from '../../utils';

/**
 * This file is needed for storing the logic for rendering trace by type (wiht buttons)
 * TODO: revisit on 1st of August 2021 and remove if it's not used
 */

const trace: GeneralTrace[] = [];
const userID = 'steve';

const renderTrace = (object: GeneralTrace | PathTrace, index: number) => {
  if (object.type === 'speak') {
    return <div>{object.payload.message}</div>;
  }

  if (object.type === 'visual') {
    return (
      <div>
        <img height="90" width="120" src={(object.payload as ImageStepData).image as string} alt="visualization" />
      </div>
    );
  }

  if (object.type === 'choice') {
    // if it's an active step
    if (trace[trace.length - 1] !== object) return false;

    const buttons = object.payload.buttons.map((data) => {
      return (
        data.name && (
          <button
            key={data.name}
            onClick={async () => {
              // TODO: remove buttons
              const trace = await api.interact((data.request.payload as any).query, userID);
            }}
            className="button button-secondary"
          >
            {data.name}
          </button>
        )
      );
    });
    return <div>{buttons}</div>;
  }

  if (object.type === 'path') {
    const choice = trace[index - 1] as ChoiceTrace;
    const selectedValue = Number(((object.payload as any).path as string).slice(7)); // choice:1 -> 1

    const button = choice.payload.buttons[selectedValue - 1];

    return <div>{button.name}</div>;
  }

  if (object.type === 'end') {
    return <hr className="separator" />;
  }

  console.warn(`rendering of type ${object.type} is broken!`);

  return false;
};

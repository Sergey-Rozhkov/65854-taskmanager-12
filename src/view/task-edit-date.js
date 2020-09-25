import {formatTaskDueDate} from "../utils/task.js";

export const createTaskEditDateTemplate = (dueDate, isDueDate, isDisabled) => {
  return `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${isDueDate ? `yes` : `no`}</span>
    </button>
    ${isDueDate ? `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${formatTaskDueDate(dueDate)}"
          ${isDisabled ? `disabled` : ``}
        />
      </label>
    </fieldset>` : ``}
  `;
};

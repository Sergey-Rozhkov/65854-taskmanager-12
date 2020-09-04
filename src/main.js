import {TASK_COUNT, RENDER_POSITION} from "./const.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import BoardPresenter from "./presenter/board.js";
import {render} from "./utils/render.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new SiteMenuView(), RENDER_POSITION.BEFOREEND);
render(siteMainElement, new FilterView(filters), RENDER_POSITION.BEFOREEND);

boardPresenter.init(tasks);

import {TASK_COUNT, RenderPosition, MenuItem, UpdateType, FilterType} from "./const.js";
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import {generateTask} from "./mock/task.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";
import {render, remove} from "./utils/render.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuView();

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      remove(statisticsComponent);
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(handleTaskNewFormClose);
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.ADD_NEW_TASK}]`).checked = true;
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).checked = false;
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.STATISTICS}]`).checked = false;
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      remove(statisticsComponent);
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).checked = true;
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.STATISTICS}]`).checked = false;
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.ADD_NEW_TASK}]`).checked = false;
      break;
    case MenuItem.STATISTICS:
      remove(statisticsComponent);
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.STATISTICS}]`).checked = true;
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.ADD_NEW_TASK}]`).checked = false;
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).checked = false;
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
boardPresenter.init();

import {RenderPosition, MenuItem, UpdateType, FilterType, AUTHORIZATION, END_POINT} from "./const.js";
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";
import {render, remove} from "./utils/render.js";
import Api from "./api.js";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const api = new Api(END_POINT, AUTHORIZATION);

const tasksModel = new TasksModel();
const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();
const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel, api);
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

filterPresenter.init();
boardPresenter.init();

api.getTasks()
.then((tasks) => {
  tasksModel.setTasks(UpdateType.INIT, tasks);
  render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
})
.catch(() => {
  tasksModel.setTasks(UpdateType.INIT, []);
  render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

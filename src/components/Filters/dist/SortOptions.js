"use strict";
exports.__esModule = true;
var react_1 = require("react");
var SortOptions = function (_a) {
    var sortKey = _a.sortKey, sortOrder = _a.sortOrder, onSortKeyChange = _a.onSortKeyChange, onSortOrderToggle = _a.onSortOrderToggle;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("select", { value: sortKey || '', onChange: function (e) { return onSortKeyChange(e.target.value); } },
            react_1["default"].createElement("option", { value: "name" }, "Sort by Name"),
            react_1["default"].createElement("option", { value: "population" }, "Sort by Population")),
        react_1["default"].createElement("button", { onClick: onSortOrderToggle },
            "Sort: ",
            sortOrder ? 'Ascending' : 'Descending')));
};
exports["default"] = SortOptions;

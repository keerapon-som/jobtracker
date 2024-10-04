export var jsonToQueryString = function (json) {
    var searchParams = new URLSearchParams();
    Object.keys(json).forEach(function (key) {
        var value = json[key];
        if (typeof value === "object" && value !== null) {
            var nestedKeys = Object.keys(value);
            var nestedValues = nestedKeys.map(function (nestedKey) { return value[nestedKey]; }).join("+");
            searchParams.append(key, nestedValues);
        }
        else {
            searchParams.append(key, String(value));
        }
    });
    return searchParams.toString();
};

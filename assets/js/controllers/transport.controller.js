mpdClient.controller('transport', function ($scope, $http, serverEvents) {
  var Status = $http({ method: 'GET', url: '/api/status' })

  $scope.status = {}

  Status.success(function (data, status, headers, config) {
    $scope.updateStatus(data)
  })

  $scope.updateStatus = function(data) {
    $scope.status = data
    if (data.time) { $scope.updateTime(data.time) }
  }

  $scope.updateTime = function(data) {
    $scope.elapsedTime = data[0]
    $scope.totalTime = data[1]
  }

  $scope.sendCommand = function (command) {
    $http({ method: 'PUT', url: '/api/control/' + command })
  }

  $scope.stopped = function () {
    return $scope.status.state == 'stop'
  }

  $scope.playing = function () {
    return $scope.status.state == 'play'
  }

  $scope.markerPosition = function () {
    return ($scope.elapsedTime / $scope.totalTime) * 100
  }

  serverEvents.onUpdateStatus($scope.updateStatus)
  serverEvents.onUpdateTime($scope.updateTime)
})

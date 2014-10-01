'use strict';
angular.module('mockMain', ['main', 'ngMockE2E'])
  .run(function($httpBackend) {

    var actions = [{
      'runner_type': 'http-runner',
      'name': 'http',
      'parameters': {
        'headers': {
          'type': 'string'
        },
        'auth': {
          'type': 'string',
          'description': 'Authorization string. Whatever that means.'
        },
        'params': {
          'type': 'string',
          'description': 'I\'m really interested to see what would happens when our description gets longer than one line. What about two or even three lines? At what point this box would became so large it would start interfering with the next one?'
        },
        'method': {
          'default': 'GET',
          'enum': ['GET', 'POST', 'PUT', 'DELETE'],
          'description': 'It\'s kind of clean what should we do with enums (except the fact you need to style them a little)...'
        },
        'ok': {
          'type': 'boolean',
          'description': 'On the other hand, booleans make me think quite hard.'
        },
        'timeout': {
          'default': 60,
          'type': 'integer',
          'description': '^^ somewhere about there, I guess.'
        }
      },
      'required_parameters': [],
      'enabled': true,
      'entry_point': '',
      'id': '540ebdfa0640fd7065e903d1',
      'description': 'Action that performs an http request.'
    }, {
      'runner_type': 'run-local',
      'name': 'local',
      'parameters': {},
      'required_parameters': [],
      'enabled': true,
      'entry_point': '',
      'id': '540ebdfa0640fd7065e903d3',
      'description': 'Action that executes an arbitrary Linux command on the localhost.'
    }, {
      'runner_type': 'run-remote',
      'name': 'remote',
      'parameters': {},
      'required_parameters': [],
      'enabled': true,
      'entry_point': '',
      'id': '540ebdfa0640fd7065e903cf',
      'description': 'Action to execute arbitrary linux command remotely.'
    }, {
      'runner_type': 'run-local',
      'name': 'send_mail',
      'parameters': {},
      'required_parameters': [],
      'enabled': true,
      'entry_point': 'send_mail/send_mail',
      'id': '540ebdfa0640fd7065e903d2',
      'description': 'This sends an email'
    }, {
      'runner_type': 'stormbot-runner',
      'name': 'stormbot_say',
      'parameters': {
        'channel': {
          'type': 'string',
          'description': 'Channel to say stuff on.',
          'position': 0
        },
        'message': {
          'type': 'string',
          'description': 'Message to say.',
          'position': 1
        }
      },
      'required_parameters': ['channel', 'message'],
      'enabled': true,
      'entry_point': 'stormbot_say/stormbot_say',
      'id': '540ebdfa0640fd7065e903d0',
      'description': 'This posts a message to StormBot'
    }];

    $httpBackend.whenGET('//172.168.50.50:9101/actions').respond(actions);

    _.each(actions, function (action) {
      $httpBackend.whenGET('//172.168.50.50:9101/actions/' + action.id).respond(action);
    });


    var rules = [{
      'description': 'Sample rule dumping webhook payload to a file.',
      'enabled': true,
      'trigger': {
        'type': 'st2.webhook',
        'parameters': {
          'url': 'person'
        }
      },
      'criteria': {
        'trigger.name': {
          'pattern': 'Joe',
          'type': 'equals'
        }
      },
      'action': {
        'name': 'local',
        'parameters': {
          'cmd': 'echo \"{{trigger}} from {{rule.trigger.type}}\" >> /tmp/st2.persons.out'
        }
      },
      'id': '540ebdfa0640fd7065e903d5',
      'name': 'st2.person.joe'
    }];

    $httpBackend.whenGET('//172.168.50.50:9101/rules').respond(rules);

    _.each(rules, function (rule) {
      $httpBackend.whenGET('//172.168.50.50:9101/rules/' + rule.id).respond(rule);
    });

    var runnertypes = [
      {
        'description': 'A runner for launching linear action chains.',
        'enabled': true,
        'id': '542505940640fd0d79b70391',
        'name': 'action-chain',
        'required_parameters': [],
        'runner_module': 'st2actions.runners.actionchainrunner',
        'runner_parameters': {}
      },
      {
        'description': 'A HTTP client for running HTTP actions.',
        'enabled': true,
        'id': '542505930640fd0d79b7038f',
        'name': 'http-runner',
        'required_parameters': [
          'url'
        ],
        'runner_module': 'st2actions.runners.httprunner',
        'runner_parameters': {
          'cookies': {
            'description': 'TODO: Description for cookies.',
            'type': 'string'
          },
          'headers': {
            'description': 'HTTP headers for the request.',
            'type': 'object'
          },
          'proxy': {
            'description': 'TODO: Description for proxy.',
            'type': 'string'
          },
          'redirects': {
            'description': 'TODO: Description for redirects.',
            'type': 'string'
          },
          'url': {
            'description': 'URL to the HTTP endpoint.',
            'type': 'string'
          }
        }
      },
      {
        'description': 'A runner to execute local actions as a fixed user.',
        'enabled': true,
        'id': '542505930640fd0d79b7038d',
        'name': 'run-local',
        'required_parameters': [],
        'runner_module': 'st2actions.runners.fabricrunner',
        'runner_parameters': {
          'cmd': {
            'description': 'Arbitrary Linux command to be executed on the host.',
            'type': 'string'
          },
          'dir': {
            'description': 'The working directory where the command will be executed on the host.',
            'type': 'string'
          },
          'hosts': {
            'default': 'localhost',
            'description': 'A comma delimited string of a list of hosts where the command will be executed.',
            'type': 'string'
          },
          'parallel': {
            'default': false,
            'description': 'If true, the command will be executed on all the hosts in parallel.',
            'type': 'boolean'
          },
          'sudo': {
            'default': false,
            'description': 'The command will be executed with sudo.',
            'type': 'boolean'
          },
          'user': {
            'description': 'The user who is executing this command. This is for audit purposes only. The command will always execute as the user stanley.',
            'type': 'string'
          }
        }
      },
      {
        'description': 'A runner to execute local actions as a fixed user.',
        'enabled': true,
        'id': '542505930640fd0d79b7038d',
        'name': 'stormbot-runner',
        'required_parameters': [],
        'runner_module': 'st2actions.runners.fabricrunner',
        'runner_parameters': {
          'cmd': {
            'description': 'Arbitrary Linux command to be executed on the host.',
            'type': 'string',
            'immutable': true
          },
          'dir': {
            'description': 'The working directory where the command will be executed on the host.',
            'type': 'string',
            'immutable': true
          },
          'hosts': {
            'default': 'localhost',
            'description': 'A comma delimited string of a list of hosts where the command will be executed.',
            'type': 'string',
            'immutable': true
          },
          'parallel': {
            'default': false,
            'description': 'If true, the command will be executed on all the hosts in parallel.',
            'type': 'boolean',
            'immutable': true
          },
          'sudo': {
            'default': false,
            'description': 'The command will be executed with sudo.',
            'type': 'boolean',
            'immutable': true
          },
          'user': {
            'description': 'The user who is executing this command. This is for audit purposes only. The command will always execute as the user stanley.',
            'type': 'string',
            'immutable': true
          }
        }
      },
      {
        'description': 'A remote execution runner that executes actions as a fixed system user.',
        'enabled': true,
        'id': '542505930640fd0d79b7038e',
        'name': 'run-remote',
        'required_parameters': [
          'hosts'
        ],
        'runner_module': 'st2actions.runners.fabricrunner',
        'runner_parameters': {
          'cmd': {
            'description': 'Arbitrary Linux command to be executed on the remote host(s).',
            'type': 'string'
          },
          'dir': {
            'description': 'The working directory where the command will be executed on the remote host.',
            'type': 'string'
          },
          'hosts': {
            'description': 'A comma delimited string of a list of hosts where the remote command will be executed.',
            'type': 'string'
          },
          'parallel': {
            'description': 'If true, the command will be executed on all the hosts in parallel.',
            'type': 'boolean'
          },
          'sudo': {
            'description': 'The remote command will be executed with sudo.',
            'type': 'boolean'
          },
          'user': {
            'description': 'The user who is executing this remote command. This is for audit purposes only. The remote command will always execute as the user stanley.',
            'type': 'string'
          }
        }
      },
      {
        'description': 'A runner for launching workflow actions.',
        'enabled': true,
        'id': '542505930640fd0d79b70390',
        'name': 'workflow',
        'required_parameters': [],
        'runner_module': 'st2actions.runners.mistral',
        'runner_parameters': {
          'context': {
            'default': {},
            'description': 'Context for the startup task.',
            'type': 'object'
          },
          'task': {
            'description': 'The startup task in the workbook to execute.',
            'type': 'string'
          },
          'workbook': {
            'description': 'The name of the workbook.',
            'type': 'string'
          }
        }
      }
    ];

    _.each(runnertypes, function (runnertype) {
      $httpBackend
        .whenGET('//172.168.50.50:9101/runnertypes?name=' + runnertype.name)
        .respond(runnertype);
    });

    var triggers = [{
      'type': 'st2.webhook',
      'id': '540ebdfa0640fd7065e903d4',
      'parameters': {
        'url': 'person'
      },
      'name': '265a30b3-5990-4313-9a14-2ef0199f7f47'
    }];

    $httpBackend.whenGET('//172.168.50.50:9101/triggers').respond(triggers);

    _.each(triggers, function (trigger) {
      $httpBackend.whenGET('//172.168.50.50:9101/triggers/' + trigger.id).respond(trigger);
    });


    var triggerInstances = [
      {
        'id': '541008ae0640fd68d6da360e',
        'occurrence_time': '2014-09-10T08:15:42.724Z',
        'payload': {
          'name': 'Joe'
        },
        'trigger': '265a30b3-5990-4313-9a14-2ef0199f7f47'
      },
      {
        'id': '541009710640fd69ab95fce2',
        'occurrence_time': '2014-09-10T08:18:57.564Z',
        'payload': {
          'name': 'Joe'
        },
        'trigger': '265a30b3-5990-4313-9a14-2ef0199f7f47'
      },
      {
        'id': '541009a90640fd6a30ddc97f',
        'occurrence_time': '2014-09-10T08:19:53.227Z',
        'payload': {
          'name': 'Joe'
        },
        'trigger': '265a30b3-5990-4313-9a14-2ef0199f7f47'
      },
      {
        'id': '54100a170640fd6a84f837ec',
        'occurrence_time': '2014-09-10T08:21:43.995Z',
        'payload': {
          'name': 'Joe'
        },
        'trigger': '265a30b3-5990-4313-9a14-2ef0199f7f47'
      }
    ];

    $httpBackend.whenGET('//172.168.50.50:9101/triggerinstances').respond(triggerInstances);

    _.each(triggerInstances, function (triggerInstance) {
      $httpBackend
        .whenGET('//172.168.50.50:9101/triggerinstances/' + triggerInstance.id)
        .respond(triggerInstance);
    });


    var actionExecutions = [
      {
        'action': {
          'id': '540ebdfa0640fd7065e903d3',
          'name': 'local'
        },
        'callback': {},
        'context': {},
        'id': '540ebea10640fd7065e903d7',
        'parameters': {
          'cmd': 'echo 1',
          'hosts': 'localhost',
          'parallel': false,
          'sudo': false
        },
        'result': {},
        'start_timestamp': '2014-09-09T08:47:29.516Z',
        'status': 'error'
      },
      {
        'action': {
          'id': '540ebdfa0640fd7065e903d3',
          'name': 'local'
        },
        'callback': {},
        'context': {},
        'id': '540ebfa20640fd7065e903d8',
        'parameters': {
          'cmd': 'echo 1',
          'hosts': 'localhost',
          'parallel': false,
          'sudo': false
        },
        'result': {},
        'start_timestamp': '2014-09-09T08:51:46.178Z',
        'status': 'error'
      },
      {
        'action': {
          'id': '540ebdfa0640fd7065e903d3',
          'name': 'local'
        },
        'callback': {},
        'context': {},
        'id': '540ec0dc0640fd72983c4eeb',
        'parameters': {
          'cmd': 'echo 1',
          'hosts': 'localhost',
          'parallel': false,
          'sudo': false
        },
        'result': {},
        'start_timestamp': '2014-09-09T08:57:00.160Z',
        'status': 'error'
      },
      {
        'action': {
          'id': '540ebdfa0640fd7065e903d3',
          'name': 'local'
        },
        'callback': {},
        'context': {},
        'id': '540ec11d0640fd746d416d71',
        'parameters': {
          'cmd': 'echo 1',
          'hosts': 'localhost',
          'parallel': false,
          'sudo': false
        },
        'result': {
          'localhost': {
            'failed': false,
            'return_code': 0,
            'stderr': '',
            'stdout': '1',
            'succeeded': true
          }
        },
        'start_timestamp': '2014-09-09T08:58:05.341Z',
        'status': 'complete'
      },
      {
        'action': {
          'id': '540ebdfa0640fd7065e903d3',
          'name': 'local'
        },
        'callback': {},
        'context': {},
        'id': '541008ae0640fd68d4a16e22',
        'parameters': {
          'cmd': 'echo {"description": u"Sample rule dumping webhook payload to a file.", "enabled": True, "trigger": {"type": "st2.webhook", "id": "540ebdfa0640fd7065e903d4", "parameters": {u"url": u"person"}, "name": u"265a30b3-5990-4313-9a14-2ef0199f7f47"}, "criteria": {u"trigger.name": {u"pattern": u"Joe", u"type": u"equals"}}, "action": SON([("name", u"local"), ("parameters", {u"cmd": u"echo \"{{rule}}\" >> /tmp/st2.persons.out"})]), "id": "540ebdfa0640fd7065e903d5", "name": u"st2.person.joe"}\" >> /tmp/st2.persons.out',
          'hosts': 'localhost',
          'parallel': false,
          'sudo': false
        },
        'result': {
          'localhost': {
            'failed': false,
            'return_code': 0,
            'stderr': '',
            'stdout': '',
            'succeeded': true
          }
        },
        'start_timestamp': '2014-09-10T08:15:42.823Z',
        'status': 'complete'
      },
      {
        'action': {
          'id': '540ebdfa0640fd7065e903d3',
          'name': 'local'
        },
        'callback': {},
        'context': {},
        'id': '541009710640fd69a8126362',
        'parameters': {
          'cmd': 'echo \"{"description": u"Sample rule dumping webhook payload to a file.", "enabled": True, "trigger": {"type": "st2.webhook", "id": "540ebdfa0640fd7065e903d4", "parameters": {u"url": u"person"}, "name": u"265a30b3-5990-4313-9a14-2ef0199f7f47"}, "criteria": {u"trigger.name": {u"pattern": u"Joe", u"type": u"equals"}, u"rule.trigger.type": {u"pattern": u"st2.webhook", u"type": u"equals"}}, "action": SON([("name", u"local"), ("parameters", {u"cmd": u"echo \"{{rule}}\" >> /tmp/st2.persons.out"})]), "id": "540ebdfa0640fd7065e903d5", "name": u"st2.person.joe"}\" >> /tmp/st2.persons.out',
          'hosts': 'localhost',
          'parallel': false,
          'sudo': false
        },
        'result': {
          'localhost': {
            'failed': false,
            'return_code': 0,
            'stderr': '',
            'stdout': '',
            'succeeded': true
          }
        },
        'start_timestamp': '2014-09-10T08:18:57.652Z',
        'status': 'complete'
      },
      {
        'action': {
          'id': '540ebdfa0640fd7065e903d3',
          'name': 'local'
        },
        'callback': {},
        'context': {},
        'id': '54100a180640fd6a7e59407e',
        'parameters': {
          'cmd': 'echo \"{u"name": u"Joe"} from st2.webhook\" >> /tmp/st2.persons.out',
          'hosts': 'localhost',
          'parallel': false,
          'sudo': false
        },
        'result': {
          'localhost': {
            'failed': false,
            'return_code': 0,
            'stderr': '',
            'stdout': '',
            'succeeded': true
          }
        },
        'start_timestamp': '2014-09-10T08:21:44.076Z',
        'status': 'complete'
      }
    ];

    $httpBackend.whenGET('//172.168.50.50:9101/actionexecutions').respond(actionExecutions);

    _.each(actionExecutions, function (actionExecution) {
      $httpBackend
        .whenGET('//172.168.50.50:9101/actionexecutions/' + actionExecution.id)
        .respond(actionExecution);
    });

    $httpBackend
      .whenPOST('//172.168.50.50:9101/actionexecutions')
      .respond(function(method, url, data) {
        var execution = angular.fromJson(data);

        var response = {
          id: 'DEADBEEFDEADBEEFDEADBEEF',
          action: {
            name: execution.action.name,
            id: _.find(actions, function (action) {
              return action.name === execution.action.name;
            }).id
          },
          callback: {},
          context: {
            'user': null
          },
          parameters: execution.parameters,
          result: {},
          'start_timestamp': new Date().toISOString(),
          status: 'scheduled'
        };

        actionExecutions.push(response);

        return [200, response, {}];
      });

    // var possibleActionIds = _.reduce(actions, function (res, action) {
    //   res[action.id] = [];
    //   return res;
    // }, {});
    //
    // var executionsByActionId = _.reduce(actionExecutions, function (res, execution) {
    //   res[execution.action.id] = (res[execution.action.id] || []).concat([execution]);
    //   return res;
    // }, possibleActionIds);
    //
    // _.each(executionsByActionId, function (executions, id) {
    //   $httpBackend
    //     .whenGET('//172.168.50.50:9101/actionexecutions?action_id=' + id)
    //     .respond(executions);
    // });

    $httpBackend
      .whenGET(/^\/\/172\.168\.50\.50:9101\/actionexecutions\?action_id=/)
      .respond(function (method, url) {
        var id = url.match(/action_id=(\w+)/)[1];

        return [200, _.filter(actionExecutions, function (execution) {
          return execution.action.id === id;
        }), {}];
      });


    var history = [
      {
        'action': {
          'runner_type': 'run-local',
          'name': 'local',
          'parameters': {},
          'required_parameters': [],
          'enabled': true,
          'entry_point': '',
          'id': '540ebdfa0640fd7065e903d3',
          'description': 'Action that executes an arbitrary Linux command on the localhost.'
        },
        'action_execution': {
          'action': {
            'id': '540ebdfa0640fd7065e903d3',
            'name': 'local'
          },
          'callback': {},
          'context': {},
          'id': '541008ae0640fd68d4a16e22',
          'parameters': {
            'cmd': 'echo {"description": u"Sample rule dumping webhook payload to a file.", "enabled": True, "trigger": {"type": "st2.webhook", "id": "540ebdfa0640fd7065e903d4", "parameters": {u"url": u"person"}, "name": u"265a30b3-5990-4313-9a14-2ef0199f7f47"}, "criteria": {u"trigger.name": {u"pattern": u"Joe", u"type": u"equals"}}, "action": SON([("name", u"local"), ("parameters", {u"cmd": u"echo \"{{rule}}\" >> /tmp/st2.persons.out"})]), "id": "540ebdfa0640fd7065e903d5", "name": u"st2.person.joe"}\" >> /tmp/st2.persons.out',
            'hosts': 'localhost',
            'parallel': false,
            'sudo': false
          },
          'result': {
            'localhost': {
              'failed': false,
              'return_code': 0,
              'stderr': '',
              'stdout': '',
              'succeeded': true
            }
          },
          'start_timestamp': '2014-09-10T08:15:42.823Z',
          'status': 'complete'
        },
        'id': '541008ae0640fd68d6da360f',
        'rule': {
          'description': 'Sample rule dumping webhook payload to a file.',
          'enabled': true,
          'trigger': {
            'type': 'st2.webhook',
            'parameters': {
              'url': 'person'
            }
          },
          'criteria': {
            'trigger.name': {
              'pattern': 'Joe',
              'type': 'equals'
            }
          },
          'action': {
            'name': 'local',
            'parameters': {
              'cmd': 'echo \"{{trigger}} from {{rule.trigger.type}}\" >> /tmp/st2.persons.out'
            }
          },
          'id': '540ebdfa0640fd7065e903d5',
          'name': 'st2.person.joe'
        },
        'trigger': {
          'type': 'st2.webhook',
          'id': '540ebdfa0640fd7065e903d4',
          'parameters': {
            'url': 'person'
          },
          'name': '265a30b3-5990-4313-9a14-2ef0199f7f47'
        },
        'trigger_instance': {
          'id': '541008ae0640fd68d6da360e',
          'occurrence_time': '2014-09-10T08:15:42.724Z',
          'payload': {
            'name': 'Joe'
          },
          'trigger': '265a30b3-5990-4313-9a14-2ef0199f7f47'
        }
      }, {
        'action': {
          'runner_type': 'run-local',
          'name': 'local',
          'parameters': {},
          'required_parameters': [],
          'enabled': true,
          'entry_point': '',
          'id': '540ebdfa0640fd7065e903d3',
          'description': 'Action that executes an arbitrary Linux command on the localhost.'
        },
        'action_execution': {
          'action': {
            'id': '540ebdfa0640fd7065e903d3',
            'name': 'local'
          },
          'callback': {},
          'context': {},
          'id': '541009710640fd69a8126362',
          'parameters': {
            'cmd': 'echo \"{"description": u"Sample rule dumping webhook payload to a file.", "enabled": True, "trigger": {"type": "st2.webhook", "id": "540ebdfa0640fd7065e903d4", "parameters": {u"url": u"person"}, "name": u"265a30b3-5990-4313-9a14-2ef0199f7f47"}, "criteria": {u"trigger.name": {u"pattern": u"Joe", u"type": u"equals"}, u"rule.trigger.type": {u"pattern": u"st2.webhook", u"type": u"equals"}}, "action": SON([("name", u"local"), ("parameters", {u"cmd": u"echo \"{{rule}}\" >> /tmp/st2.persons.out"})]), "id": "540ebdfa0640fd7065e903d5", "name": u"st2.person.joe"}\" >> /tmp/st2.persons.out',
            'hosts': 'localhost',
            'parallel': false,
            'sudo': false
          },
          'result': {
            'localhost': {
              'failed': false,
              'return_code': 0,
              'stderr': '',
              'stdout': '',
              'succeeded': true
            }
          },
          'start_timestamp': '2014-09-10T08:18:57.652Z',
          'status': 'complete'
        },
        'id': '541009710640fd69ab95fce3',
        'rule': {
          'description': 'Sample rule dumping webhook payload to a file.',
          'enabled': true,
          'trigger': {
            'type': 'st2.webhook',
            'parameters': {
              'url': 'person'
            }
          },
          'criteria': {
            'trigger.name': {
              'pattern': 'Joe',
              'type': 'equals'
            }
          },
          'action': {
            'name': 'local',
            'parameters': {
              'cmd': 'echo \"{{trigger}} from {{rule.trigger.type}}\" >> /tmp/st2.persons.out'
            }
          },
          'id': '540ebdfa0640fd7065e903d5',
          'name': 'st2.person.joe'
        },
        'trigger': {
          'type': 'st2.webhook',
          'id': '540ebdfa0640fd7065e903d4',
          'parameters': {
            'url': 'person'
          },
          'name': '265a30b3-5990-4313-9a14-2ef0199f7f47'
        },
        'trigger_instance': {
          'id': '541009710640fd69ab95fce2',
          'occurrence_time': '2014-09-10T08:18:57.564Z',
          'payload': {
            'name': 'Joe'
          },
          'trigger': '265a30b3-5990-4313-9a14-2ef0199f7f47'
        }
      }, {
        'action': {
          'runner_type': 'run-local',
          'name': 'local',
          'parameters': {},
          'required_parameters': [],
          'enabled': true,
          'entry_point': '',
          'id': '540ebdfa0640fd7065e903d3',
          'description': 'Action that executes an arbitrary Linux command on the localhost.'
        },
        'action_execution': {
          'action': {
            'id': '540ebdfa0640fd7065e903d3',
            'name': 'local'
          },
          'callback': {},
          'context': {},
          'id': '54100a180640fd6a7e59407e',
          'parameters': {
            'cmd': 'echo \"{u"name": u"Joe"} from st2.webhook\" >> /tmp/st2.persons.out',
            'hosts': 'localhost',
            'parallel': false,
            'sudo': false
          },
          'result': {
            'localhost': {
              'failed': false,
              'return_code': 0,
              'stderr': '',
              'stdout': '',
              'succeeded': true
            }
          },
          'start_timestamp': '2014-09-10T08:21:44.076Z',
          'status': 'complete'
        },
        'id': '54100a180640fd6a84f837ed',
        'rule': {
          'description': 'Sample rule dumping webhook payload to a file.',
          'enabled': true,
          'trigger': {
            'type': 'st2.webhook',
            'parameters': {
              'url': 'person'
            }
          },
          'criteria': {
            'trigger.name': {
              'pattern': 'Joe',
              'type': 'equals'
            }
          },
          'action': {
            'name': 'local',
            'parameters': {
              'cmd': 'echo \"{{trigger}} from {{rule.trigger.type}}\" >> /tmp/st2.persons.out'
            }
          },
          'id': '540ebdfa0640fd7065e903d5',
          'name': 'st2.person.joe'
        },
        'trigger': {
          'type': 'st2.webhook',
          'id': '540ebdfa0640fd7065e903d4',
          'parameters': {
            'url': 'person'
          },
          'name': '265a30b3-5990-4313-9a14-2ef0199f7f47'
        },
        'trigger_instance': {
          'id': '54100a170640fd6a84f837ec',
          'occurrence_time': '2014-09-10T08:21:43.995Z',
          'payload': {
            'name': 'Joe'
          },
          'trigger': '265a30b3-5990-4313-9a14-2ef0199f7f47'
        }
      }
    ];

    $httpBackend.whenGET('//172.168.50.50:9101/history').respond(history);

    _.each(history, function (record) {
      $httpBackend
        .whenGET('//172.168.50.50:9101/history/' + record.id)
        .respond(record);
    });


    $httpBackend.whenGET(/\.html$/).passThrough();

    // Pass through real API
    var storedHost = localStorage.getItem('st2Host');
    if (storedHost) {
      $httpBackend.whenGET(new RegExp('^' + storedHost)).passThrough();
    }

  });

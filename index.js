// livelogging demo [
// https://www.npmjs.com/package/livelogging

var LiveLogging = require('livelogging')

var options = {
    datafile: 'messages.log',
    logToConsole: true,
    server: true,
    port: 7089
}

LiveLogging.server(options)

// LOGGING ANY ABSTRACTION LEVEL [
// default style: separate by type or all in console [

LiveLogging.log('Process A/errors', 'This is error')
LiveLogging.log('Process A/warnings', 'This is warning')
LiveLogging.log('Process A/all', 'error: Critical error')
LiveLogging.log('Process A/all', 'warning: Minor message')

// default style: separate by type or all in console ]
// unix-style console [

LiveLogging.log('Server B/unix', 'debug: DEBUG=1')
LiveLogging.log('Server B/unix', 'info: Server is started')
LiveLogging.log('Server B/unix', 'notice: User: hi :)')
LiveLogging.log('Server B/unix', 'warning: Another message')
LiveLogging.log('Server B/unix', 'critical: Segmentation fault')
LiveLogging.log('Server B/unix', 'alert: Alarm!')
LiveLogging.log('Server B/unix', 'emergency: No free space!')

// unix-style console ]
// IGLogger-style [
// http://labs.ig.com/logging-level-wrong-abstraction
// https://www.reddit.com/r/programming/comments/66ftqf/logging_levels_the_wrong_abstraction/

LiveLogging.log('Client C/inTestEnv', 'Database is initialized')
LiveLogging.log('Client C/inProdEnv', 'Production bootstrap')
LiveLogging.log('Client C/toInvestigateTomorrow', 'keyvalue is not present, recreate!')
LiveLogging.log('Client C/wakeMeInTheMiddleOfTheNight', 'This need to be investigated now! Donate for LiveLogging! :)')

// IGLogger-style ]
// LOGGING ANY ABSTRACTION LEVEL ]
// livelogging demo ]
// livecomment demo [
// https://www.npmjs.com/package/livecomment

var LiveComment = require('livecomment')

var options = {
  port: 3070,
  ws_port: 3071,
  dangerousCodeExecution: ['client', 'server'], // for plugins 
  debug: 1,
  common: {
    ignore: [
      /^node_modules.*/,
      /^\.idea.*/,
      /^\.svn.*/,
      /^\.git.*/
    ]
  },
  paths: [
    '.'
  ]
};

options.extlangs = {
  'css': 'css',
  'less': 'css',
  'js': 'javascript',
  'jsx': 'javascript',
//    'jade': 'jade',
  'json': 'javascript',

  'hpp': 'cpp',
  'cpp': 'cpp',
  'c': 'c',
  'h': 'cpp',

  'm': 'objectivec',
  'mm': 'objectivec',

  'acpul': 'c',

  'pro': 'c',
  'sh': 'c',

  'py': 'python',

  'as': 'javascript',

  'log': 'c',
  'txt': 'none'
}

options.extractCommentTagFromLine = function extractCommentTagFromLine(fileext, line) {
  line = line.trim();
  var b;
  function chkfmt(b) {
    if (line.indexOf(b) == 0 && line.indexOf('[') == line.length-1) // begin
      return [line.substr(b.length, line.length-b.length-1).trim(), 0];
    if (line.indexOf(b) == 0 && line.indexOf(']') == line.length-1 && line.indexOf('[') == -1) // end
      return [line.substr(b.length, line.length-b.length-1).trim(), 1];
    return null;
  };

  switch (fileext) {
    case '.log':
    case '.txt':
    function chkfmt0() {
      if (line.length > 0 && line.indexOf('[') == line.length-1) {// begin
        return [line.substr(0, line.length-1).trim(), 0];
      }
      if (line.length > 0 && line.indexOf(']') == line.length-1 && line.indexOf('[') == -1) { // end
        return [line.substr(0, line.length-1).trim(), 1];
      }
      return null
    }
      return chkfmt0() || false;
    case '.js':
    case '.jsx':
    case '.java':
    case '.c':
    case '.h':
    case '.cpp':
    case '.hpp':
    case '.less':
    case '.m':
    case '.mm':
    case '.as':
      return chkfmt('//') || false;
    case '.css':
      return chkfmt('/*') || false;
    case '.acpul':
    case '.sh':
    case '.py':
    case '.pro':
      return chkfmt('#') || false;
    case '.ejs':
    case '.jade':
    case '.sass':
    case '.styl':
    case '.coffee':
      break;
    default:
      return null;
  }
  return false;
}

var scriptPath = require('path').dirname(require.main.filename)

options.hooks = {
  beforeSet: function beforeSet(o) {
    var ss = [
      scriptPath,
      '/home/user'
    ]
    function replaceString(s) {
      o.name = o.name.replace(s, '$')
      o.lines.forEach(function (line, i, lines) {
        lines[i] = line.replace(s, '$')
      });
    }
    ss.forEach(replaceString)

    o.lines.forEach(function (line, i, lines) {
      lines[i] = (line.toLowerCase().indexOf('password') != -1) ? "---PASSWORD-OBFUCSATED---" : line
    });
    return o
  }
}

var livecomment = new LiveComment(options);

// livecomment demo ]

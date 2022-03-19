<?php
namespace Deployer;

require 'recipe/common.php';

// Project name
set('application', 'vingobooking-admin-fe');

// Project repository
set('repository', 'git@bitbucket.org:danghoa/vingobooking-admin-fe.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

// Shared files/dirs between deploys
set('shared_files', []);
set('shared_dirs', []);

// Writable dirs by web server
set('writable_dirs', []);

//set time out
set('default_timeout', 300000000000000);

set('keep_releases', 2);

// Hosts
host('sieudd@103.147.126.140')
    ->set('deploy_path', '~/data/{{application}}');

// Tasks
desc('Deploy your project');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:unlock',
    'deploy:release',
    'deploy:update_code',
    'deploy:yarn',
    'deploy:build',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'reload:nginx',
    'success',
]);

//reload nginx service
task('reload:nginx', function () {
    run('sudo /usr/sbin/service nginx reload');
});

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

//create env for env example
task('deploy:yarn', function () {
    run('cd {{release_path}}   &&  yarn');
});

//create env for env example
task('deploy:build', function () {
    run('cd {{release_path}}   &&   yarn build');
});

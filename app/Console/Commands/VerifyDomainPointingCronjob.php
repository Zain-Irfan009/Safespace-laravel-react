<?php

namespace App\Console\Commands;

use App\Http\Controllers\SubdomainController;
use App\Models\User;
use Illuminate\Console\Command;

class VerifyDomainPointingCronjob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'domain-pointing:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $helper = new SubdomainController();
        $helper->cronjobDomainPointing();
        $helper->cronjobDomainChecker();
        $helper->cronjobSSLChecker();
        $helper->cronjobNewUserSSLInstall();
        $helper->cronjobNewUserDomainAdd();
        return Command::SUCCESS;
    }
}

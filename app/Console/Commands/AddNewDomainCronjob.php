<?php

namespace App\Console\Commands;

use App\Http\Controllers\SubdomainController;
use Illuminate\Console\Command;

class AddNewDomainCronjob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'domain-adding:sync';

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
        $helper->cloudwaysSSLInstall();
        $helper->cloudwaysDomainAdd();
        return Command::SUCCESS;
    }
}

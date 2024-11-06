<?php

namespace App\Console;

use App\Http\Controllers\SubdomainController;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
//        $schedule->call(function (){
//            $helper = new SubdomainController();
//            $helper->cronjobDomainPointing();
//            $helper->cronjobDomainChecker();
//            $helper->cronjobSSLChecker();
//            $helper->cronjobNewUserSSLInstall();
//            $helper->cronjobNewUserDomainAdd();
//        })->name('verify-domains')->withoutOverlapping()->everyMinute();

        $schedule->command('domain-pointing:sync')->everyTwoMinutes();
        $schedule->command('domain-adding:sync')->twiceDaily();


//        $schedule->call(function (){
//            $helper = new SubdomainController();
//            $helper->cloudwaysDomainAdd();
////            $helper->cloudwaysSSLInstall();
//        })->name('connect-domains')->withoutOverlapping()->twiceDaily();
//
//        $schedule->call(function (){
//            $helper = new SubdomainController();
////            $helper->cloudwaysDomainAdd();
//            $helper->cloudwaysSSLInstall();
//        })->name('ssl-install-on-domains')->withoutOverlapping()->twiceDaily();


        $schedule->command('email:sender')->everyMinute();
        // $schedule->command('inspire')->hourly();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

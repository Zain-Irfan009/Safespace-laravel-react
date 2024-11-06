<?php

namespace App\Console\Commands;

use App\Http\Controllers\AbandonedCheckoutController;
use Illuminate\Console\Command;

class CheckoutEmailSender extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:sender';

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
        $helper = new AbandonedCheckoutController();
        $helper->emailSender();

        return Command::SUCCESS;
    }
}

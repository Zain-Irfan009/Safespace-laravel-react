<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReturnOrderCreated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $returnOrder;
    public function __construct($returnOrder)
    {
        $this->returnOrder = $returnOrder;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        try{
         return $this->subject('Return Order Request')
                    ->view('emails.return-order-created');
        }catch (\Exception $exception){
            dd($exception->getMessage());
        }
    }
}
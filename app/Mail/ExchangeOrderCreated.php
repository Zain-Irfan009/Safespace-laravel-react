<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ExchangeOrderCreated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $exchangeOrder;
    public function __construct($exchangeOrder)
    {
        $this->exchangeOrder = $exchangeOrder;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        try{
         return $this->subject('Exhange Order Request')
                    ->view('emails.exchane-order');
        }catch (\Exception $exception){
            dd($exception->getMessage());
        }
    }
}
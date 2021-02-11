<?php

namespace App\DataFixtures;

use App\Entity\Article;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Faker\Factory;


class ArticleFixtures  extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $faker->seed(0);
        /* Users */
        $intDate = strval($faker->year . $faker->month . $faker->dayOfMonth);
        for ($i = 0; $i < 20; $i++) {
            $article = new Article();
            $article
                ->setDate($intDate)
                ->setTitle($faker->text(20))
                ->setSubtitle($faker->realText(30))
                ->setContent($faker->realText(500))
                ->setImage($faker->imageUrl())
                ->setCategory($faker->text(10))
                ->setAuthor($faker->lastName);
            $manager->persist($article);
            $articles[] = $article;
            $manager->flush();
        }

    }
}
<?php


namespace App\Service;


use Doctrine\Common\Annotations\Reader;
use Symfony\Contracts\Cache\CacheInterface;

class AnnotationReaderHelperService
{
    private Reader $reader;
    private CacheInterface $cache;

    public function __construct(
        Reader $reader,
        CacheInterface $cache
    ) {
        $this->reader = $reader;
        $this->cache = $cache;
    }

    public function getMethodsAnnotatedWith(string $class, string $annotationClass): array
    {
        $result = [];
        $reflection = new \ReflectionClass($class);
        foreach ($reflection->getMethods() as $method) {
            $annotation = $this->reader->getMethodAnnotation($method, $annotationClass);
            if ($annotation) {
                $result[] = [
                    'method' => $method,
                    'annotation' => $annotation
                ];
            }
        }
        return $result;
    }
}
